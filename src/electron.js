export const path = self.require('path')
export const fs = self.require('fs')
export const electron = self.require('electron')
export const ipc = electron.ipcRenderer
export const remote = self.require('remote')
export const dialog = remote.require('dialog')
export const currentWindow = remote.getCurrentWindow()
export const webContents = currentWindow.webContents
export const Menu = remote.require('menu')
