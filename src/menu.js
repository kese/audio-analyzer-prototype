import { Menu, webContents  } from './electron'
import app from './app'

const menuTree = [
    {
        label: "Datei",
        submenu: [
            {
                label: 'Öffnen',
                accelerator: 'CmdOrCtrl+O',
                click: () => app.trigger('openFileDialog')
            }
        ]
    },
    {
        label: "Fenster",
        submenu: [
            {
                label: 'Neustarten',
                accelerator: 'CmdOrCtrl+R',
                click: webContents.reload
            },
            {
                label: 'Entwicklertools',
                accelerator: 'Ctrl+Shift+I',
                click: webContents.openDevTools
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuTree)
Menu.setApplicationMenu(menu)
addEventListener('contextmenu', () => menu.popup(webContents) && false)

export default menu
