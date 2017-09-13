import { extend, range } from 'lodash'
import worker from './worker'
import FFT from './fft'

const { POSITIVE_INFINITY: SUP, NEGATIVE_INFINITY: INF } = Number

function chunkOffset(res, count, size, off) {
    const r = (off * res) % count, o = ~~(off * size)
    return 2 * r < count ? o : o + 1
}

// https://www.cds.caltech.edu/~murray/wiki/Why_is_dB_defined_as_20log_10%3F
function toDecibels(val) {
    return val ? 20 * Math.log10(val) : INF
}

function clip(val, min, max) {
    return Math.min(max, Math.max(min, val))
}

function normalize(val, { dB, min, max }) {
    const v = dB ? toDecibels(val) : val
    return (clip(v, min, max) - min) / (max - min)
}

export default extend(worker, {

    autoSizedChunks(res, count, off = 0, ext = count) {
        if (count < ext) throw new Error('count must not be smaller then ext')
        const size = res / count
        if (~~size === size)
            return range(off, off + ext).map(o => [o * size, size])
        const last = chunkOffset(res, count, size, off + ext)
        return range(off, off + ext)
            .map(o => chunkOffset(res, count, size, o))
            .map((o, i, a) => [o, (a[i + 1] || last) - o])
    },

    distributedChunks(res, count, size, off = 0, ext = count) {
        const chunks = this.autoSizedChunks(res - size, count - 1, off, ext - 1)
        chunks.push([chunks[ext - 2][0] + chunks[ext - 2][1]])
        return chunks.map((([o]) => [o, size]))
    },

    min(seq) {
        return seq.reduce((acc, val) => Math.min(acc, val), SUP)
    },

    max(seq) {
        return seq.reduce((acc, val) => Math.max(acc, val), INF)
    },

    avg(seq) {
        return seq.reduce((acc, val) => acc + val, 0) / seq.length
    },

    rms(seq) {
        return Math.sqrt(seq.reduce((acc, val) =>
            acc + val * val, 0) / seq.length)
    },

    peakLevels(chunks, params) {
        return chunks.map(chunk => ({
            min: normalize(Math.abs(this.min(chunk)), params),
            max: normalize(Math.abs(this.max(chunk)), params)
        }))
    },

    rmsLevels(chunks, params) {
        return chunks.map(chunk => normalize(this.rms(chunk), params))
    },

    freqSpectra(chunks, params) {
        const fft = FFT.forSize(params.chunkSize)
        return chunks.map(chunk =>
            fft(chunk).map(val => normalize(val, params)))
    }
})
