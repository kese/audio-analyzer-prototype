import { ipcMain as ipc, app, dialog, BrowserWindow } from 'electron'

app.on('ready', function() {

    const win = new BrowserWindow({
        'width': 1024, 'height': 768,
        'auto-hide-menu-bar': true,
        'title': 'Viewer Prototype - Revision 2015-12-08 - Peter Holstein, Sebastian Kehr',
        'web-preferences': { 'webaudio': true }
    })

    ipc.on('openFileDialog', ({ sender }, args) =>
        dialog.showOpenDialog(args, paths =>
            sender.send('openFileDialog', paths)))

    win.loadURL(`file://${__dirname}/app.html`)
    /*win.maximize()*/
    /*win.openDevTools()*/

})
