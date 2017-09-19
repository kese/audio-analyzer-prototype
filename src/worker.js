export const worker = {}

export function onMessage(message) {
    const { action, args } = message.data
    Promise.resolve(worker[action](...args))
        .catch(result => {
            if (result instanceof Error) throw result
            return { result, resolved: false }
        })
        .then(result => ({ result, resolved: true }))
        .then(self.postMessage)
}

self.onmessage = onMessage
