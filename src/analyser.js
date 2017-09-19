import { extend, flatten, range } from 'lodash'
import WorkerProxy from './worker-proxy'
import worker from './analyser-worker'


class AnalyserWorkerProxy extends WorkerProxy {

    static get scriptURL() { return 'analyser-worker-loader.js' }

    static get workerStub() { return worker }

    static get workerCount() { return 8 }
}

const proxy = AnalyserWorkerProxy.create()
const { workerCount } = AnalyserWorkerProxy
const { chunkScheme } = proxy

class Analyser {

    constructor(audio, params) {
        extend(this, { audio, params, values: new Map })
    }

    seq(off, ext) {

        const { audio, values, params } = this
        const { chunkCount, channelMask, chunkSize } = params

        if (off + ext > chunkCount) throw new Error('interval out of range')

        const chunkBinCount = Math.min(workerCount, ext)
        const allChunks = chunkScheme(audio.buffer.length, chunkCount, off, ext, chunkSize)
        const filteredChunks = allChunks.then(chunks =>
            chunks.filter(([o]) => !values.has(o)))

        return Promise.join(filteredChunks, audio.data(channelMask))
            .then(([chunks, data]) => Promise.join(
                chunks.map(([o, e]) => data.slice(o, o + e)),
                chunkScheme(chunks.length, chunkBinCount)
            ))
            .then(([chunks, chunkBins]) => Promise.all(
                chunkBins.map(([o, e]) => range(o, o + e).map(i => chunks[i]))
                    .map(chunkBin => this.process(chunkBin, params))
            ))
            .then(chunkBins => Promise.join(
                allChunks, filteredChunks, flatten(chunkBins)
            ))
            .then(([allChunks, filteredChunks, results]) => {
                filteredChunks.forEach(([o], i) => values.set(o, results[i]))
                return allChunks.map(([o], i) => values.get(o))
            })
    }

    process(chunks) { return chunks }
}

export class PeakLevelsAnalyser extends Analyser {
    process(...args) { return proxy.peakLevels(...args) }
}

export class RmsLevelsAnalyser extends Analyser {

    process(...args) { return proxy.rmsLevels(...args) }

    avg(off, ext) { return this.seq(off, ext).then(proxy.avg) }

    max(off, ext) { return this.seq(off, ext).then(proxy.max) }

    min(off, ext) { return this.seq(off, ext).then(proxy.min) }
}

export class FreqSpectraAnalyser extends Analyser {
    process(...args) { return proxy.freqSpectra(...args) }
}
