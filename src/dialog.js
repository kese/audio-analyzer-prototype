import { ipc } from './electron'
import app from './app'

app.on('openFileDialog', () => ipc.send('openFileDialog', {
    properties: ['openFile'], title: 'Datei öffnen'
}))

ipc.on('openFileDialog', (event, paths) =>
    paths && paths[0] && app.trigger('loadFile', paths[0]))
