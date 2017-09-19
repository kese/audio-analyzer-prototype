import { extend, memoize, partial, once, throttle, debounce, defer } from 'lodash'
import app from './app'
import audioContext from './audio-context'

app.on('fileLoaded', file => Audio.fromFile(file)
    .then(audio => app.trigger('audioLoaded', audio)))

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
        extend(this, { context, buffer, data, paused: true })
    }

    stopSource() {}

    preparePlayback(offset, extent) {

        const { context, buffer } = this
        this.stopSource()
        this.pausePlayback()

        const source = context.createBufferSource()
        source.buffer = buffer
        source.connect(context.destination)
        this.stopSource = once(() => {
            source.stop()
            source.disconnect(context.destination)
        })

        const offTime = offset * buffer.duration
        const extTime = extent * buffer.duration
        const startTime = context.currentTime - offTime

        this.onPlayback = throttle(() => {
            this.update({ position: context.currentTime - startTime })
            if (!this.paused) requestAnimationFrame(() => this.onPlayback())
        }, 500)

        source.onended = () => {
            this.pausePlayback()
            this.preparePlayback(offset, extent)
        }
        source.start(0, offTime, extTime)
        context.suspend()
        extend(this, { source })
    }



    resumePlayback() {
        this.paused = false
        this.context.resume()
        this.onPlayback()
    }

    pausePlayback() {
        this.paused = true
        this.context.suspend()
    }

    togglePlayback() {
        switch(this.context.state) {
            case 'suspended': return this.resumePlayback()
            case 'running': return this.pausePlayback()
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
