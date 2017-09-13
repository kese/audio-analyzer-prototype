const worker = {}

self.onmessage = function(message) {
    const { action, args } = message.data
    Promise.resolve(worker[action](...args))
        .catch(result => {
            if (result instanceof Error) throw result
            return { result, resolved: false }
        })
        .then(result => ({ result, resolved: true }))
        .then(self.postMessage)
}

export default worker
