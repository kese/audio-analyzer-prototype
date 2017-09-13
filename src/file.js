import { fs } from './electron'
import Vinyl from 'vinyl'
import { extend } from 'lodash'
import app from './app'

app.on('loadFile', path => File.read(path)
    .then(file => app.trigger('fileLoaded', file)))

const bytesPerMegaByte = Math.pow(2, 20)

function readStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, data) => err ? reject(err) : resolve(data))
    })
}

function readContents(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => err ? reject(err) : resolve(data))
    })
}

export default class File extends Vinyl {

    static read(path) { return this.fromPath(path).read() }

    static fromPath(path) { return new File({ path })}

    read() {
        const { path } = this
        return Promise.join(readStat(path), readContents(path))
            .then(([stat, contents]) => extend(this, { stat, contents }))
    }

    get sizeInMegaBytes() {
        return Math.round( this.stat.size / bytesPerMegaByte * 100) / 100
    }
}
