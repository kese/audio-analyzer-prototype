importScripts('../jspm_packages/system.js')
importScripts('../jspm_packages/system.config.js')
const p = Promise.all([System.import('./worker'), System.import('./analyser-worker')])
self.onmessage = function(msg) {
    p.then(([u, v]) => u.onMessage(msg))
}
