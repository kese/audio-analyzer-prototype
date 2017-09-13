import app from 'app'
import BrowserWindow from 'browser-window'
import dialog from 'dialog'
import { ipcMain as ipc } from 'electron'

app.on('ready', function() {

    const win = new BrowserWindow({
        'width': 800, 'height': 600,
        'auto-hide-menu-bar': true,
        'web-preferences': { 'webaudio': true }
    })

    ipc.on('openFileDialog', ({ sender }, args) =>
        dialog.showOpenDialog(args, paths =>
            sender.send('openFileDialog', paths)))
            
    win.maximize()
    win.loadURL(`file://${__dirname}/app.html`)
    win.openDevTools()

})
