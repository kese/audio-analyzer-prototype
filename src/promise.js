Object.assign(Promise, {
    join(...args) {
        return Promise.all(args)
    }
})

/*Object.assign(Promise.prototype, {
    forEach(func) {
        return this.then(arg => arg.forEach(func) || arg)
    },
    map(...args) {
        return this.then(arg => Promise.all(arg.map(...args)))
    },
    reduce(func, start) {
        return this.then(arg => arg.reduce((...args) =>
            Promise.resolve(func(...args)), start))
    },
    filter(func) {
        return this.then(arg => arg.filter(func))
    },
    tap(func) {
        return this.then(args =>
            Promise.resolve(func(args)).then(() => args))
    }
})*/

export default Promise
