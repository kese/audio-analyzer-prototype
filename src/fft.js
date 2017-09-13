import FFT from 'fft'
import { blackman, hann, hamming } from 'fft-windowing'
import { FFT as mlfft } from 'ml-fft'

const win = blackman
const abs = (x, y) => Math.sqrt(x * x + y * y)

function fft(instance, size, input) {
    const output = new Float32Array(size * 2)
    instance.simple(output, win(input), 'real')
    return output.subarray(1, size + 1)
        .map((v, i, a) => i % 2 ? v : abs(v, a[i + 1]) / size)
        .filter((v, i) => !(i % 2))
}

function fft2(size) {
    mlfft.init(size)
    return real => {
        const imag = new Float32Array(size)
        mlfft.fft(win(real), imag)
        return real.subarray(1, size / 2)
            .map((v, i) => abs(v, imag[i]) / size)
    }
}

function __fft(size) {
    const instance = new FFT.complex(size, false)
    return input => fft(instance, size, input)
}


export default {
    forSize(size) { return __fft(size) }
}

/*


function fddOp(func, data, numberOfChunks, framesPerChunk) {
    func.init(framesPerChunk)
    return splitEquallyFixed(0, data.length, numberOfChunks, framesPerChunk)
        .map(([offset, extent]) => func(data, offset, framesPerChunk))
}*/


/*let i = 0
const maxdb = -30.0
const mindb = -100.0
const dbscale = 1 / (maxdb - mindb)
const scale = 1.0 / 1024
const k = 0.8*/


// uses mlfft
/*function spectrum2(data, offset, framesPerChunk) {
     mlfft.init(framesPerChunk)
     const real = data.slice(offset, offset + framesPerChunk)
     const imag = new Float32Array(framesPerChunk)
     mlfft.fft(real, imag)

     const scale = 1 / framesPerChunk
     const ret = real.slice(1, framesPerChunk/2)
        .map((v, i) => abs2(v, imag[i]) * scale)*/
        /*.map(v => 20.0 * Math.log10(v))*/
        /*.map(v => (v - mindb) * dbscale) // normalize*/
     /*console.log('output', real, imag)*/
     /*return ret
}*/


/*function spectrum(data, offset, framesPerChunk) {
    const fft = new FFT.complex(framesPerChunk, false)
    const input = data.slice(offset, offset + framesPerChunk)
    const output = new Float32Array(framesPerChunk * 2)
*/
    /*Windowing.hann()*/
    /*fft.simple(output, input, 'real')
    const ret = output.subarray(1, framesPerChunk + 1)
        .map((v, i, a) => i % 2 ? v : abs(v, a[i + 1]))
        .filter((v, i) => !(i % 2))*/
        /*.map(v => v * magScale)*/ //normalize
        /*.map(v => 20.0 * Math.log10(v))*/ // to dB
    /*console.log('output', output[0], output[framesPerChunk], output)
    return ret

}*/
