const { decodeAudioData } = AudioContext.prototype

Object.assign(AudioContext.prototype, {
    decodeAudioData(buffer) {
        return new Promise((resolve, reject) =>
            decodeAudioData.bind(this)(buffer, resolve, reject))
    }
})

const audioContext = new AudioContext()

export default audioContext
