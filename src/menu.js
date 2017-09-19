import { Menu, webContents, currentWindow  } from './electron'
import app from './app'

const menuTree = [
    {
        label: "File",
        submenu: [
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click: () => app.trigger('openFileDialog')
            }
        ]
    },
    {
        label: "Window",
        submenu: [
            {
                label: 'Restart',
                accelerator: 'CmdOrCtrl+R',
                click: webContents.reload
            },
            {
                label: 'Toggle Fullscreen',
                accelerator: 'F11',
                click: () => currentWindow.setFullScreen(!currentWindow.isFullScreen())
            },
            {
                label: 'Devtools',
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
