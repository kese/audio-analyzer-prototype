import { extend, chain, unique } from 'lodash'

// do not collect props defined in Object.prototype
function shouldBeProcessed(o) {
    return !!(o && Object.getPrototypeOf(o))
}

function propertyNames(target) {
    const names = []
    for(let o = target; shouldBeProcessed(o); o = Object.getPrototypeOf(o))
        Array.prototype.push.apply(names, Object.getOwnPropertyNames(o))
    return chain(names).unique().without('constructor').value()
}

export default class Proxy {
    constructor(__target, __handler) {
        extend(this, { __target, __handler })
        propertyNames(__target).forEach(name =>
            Object.defineProperty(this, name, {
                    get() { return __handler.get(__target, name, this) }
            }))
    }
}
