import { extend, memoize, partial } from 'lodash'
import app from './app'
import audioContext from './audio-context'

app.on('fileLoaded', file => Audio.fromFile(file)
    .then(audio => app.trigger('audioLoaded', audio)))

function setupSource(audio) {
    const { context, buffer } = audio
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    source.onended = function() {
        source.disconnect(context.destination)
        setupSource(audio)
    }
    context.suspend()
    source.start(0)
}

export default class Audio {

    static fromFile(file) {
        return Audio.fromBuffer(file.contents.buffer)
    }

    static fromBuffer(buffer) {
        return audioContext.decodeAudioData(buffer)
            .then(decodedBuffer => new Audio(decodedBuffer))
    }

    constructor(buffer) {
        const data = memoize(partial(bufferData, buffer))
        const context = new AudioContext()
        extend(this, { context, buffer, data })
        setupSource(this)
    }

    togglePlayback() {
        switch(this.context.state) {
            case 'suspended': return this.context.resume()
            case 'running': return this.context.suspend()
            case 'closed':
            default: throw new Error('context neither suspended nor running')
        }
    }

    shutdown() { this.context.close() }
}

const splitMask = memoize(mask =>
    (mask >>> 0).toString(2).split('').reverse()
        .map((v, i) => parseInt(v) * Math.pow(2, i)).filter(v => v))

function enabledBits(mask) {
    return (mask >>> 0).toString(2).split('').reverse()
        .map((v, i) => parseInt(v) * (i + 1)).filter(v => v).map(v => v - 1)
}

function bufferData(buffer, channelMask) {
    const { numberOfChannels: noc, length, sampleRate } = buffer
    const channels = enabledBits(channelMask).filter(c => c < noc)
    if (!channels.length)
        return Promise.resolve(new Float32Array(length))
    const context = new OfflineAudioContext(1, length, sampleRate)
    const splitter = context.createChannelSplitter(noc)
    const merger = context.createChannelMerger(channels.length)
    const source = context.createBufferSource(noc, length, sampleRate)
    source.buffer = buffer
    source.connect(splitter)
    channels.forEach((c, i) => splitter.connect(merger, c, i))
    merger.connect(context.destination)
    source.oncomplete = function() {
        source.disconnect(splitter)
        enabledChannels.forEach((c, i) => splitter.disconnect(merger, c, i))
        merger.disconnect(context.destination)
        context.close()
    }
    source.start()
    return context.startRendering().then(b => b.getChannelData(0))
}
