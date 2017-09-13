import { extend, range } from 'lodash'
import Proxy from './proxy'

/*let raceId = 0*/

export default class WorkerProxy extends Proxy {

    static get workerCount() { return 1 }

    static get workerStub() { return {} }

    static get Handler() { return Handler }

    static create() { return new this(this) }

    constructor({ workerStub, workerCount, scriptURL, Handler }) {
        super(workerStub, new Handler)
        const indices = range(workerCount)
        this.__workers = indices.map(index =>
            extend(new Worker(scriptURL), {
                onmessage: message => this.__receiveMessage(index, message)
            }))
        this.__racers = indices.map(index => Promise.resolve(index))
        this.__race = Promise.race(this.__racers)
        this.__callbacks = new Array(workerCount)
    }

    __receiveMessage(index, message) {
        const { result, resolved } = message.data
        const { resolve, reject } = this.__callbacks[index]
        if (resolved) resolve(result)
        else reject(content)
    }

    __postMessage(message) {
        const promise = this.__race.then(index =>
            new Promise((resolve, reject) => {
                /*console.log(`worker ${index} won race ${raceId}`); raceId++*/
                this.__callbacks[index] = { resolve, reject }
                this.__workers[index].postMessage(message)
            }))
        this.__race = this.__race.then(index => {
            this.__racers[index] = promise.then(() => index)
            return Promise.race(this.__racers)
        })
        return promise
    }
}

class Handler {
    get(target, action, proxy) {
        if (typeof target[action] === 'function')
            return (...args) => proxy.__postMessage({ action, args })
        throw new Error(`unknown function '${name}'`)
    }
}
