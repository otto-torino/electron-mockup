// ./main.js
const url = require('url')
const path = require('path')
const { app, BrowserWindow, Menu, shell } = require('electron')

let win = null

function createMenu (win) {
  var menu = Menu.buildFromTemplate([
    {
      label: 'App',
      submenu: [
        {
          label: 'Quit',
          click () {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Start Tour',
          click () {
            win.webContents.send('start-help-tour')
          }
        },
        {
          label: 'Report Issue',
          click () {
            shell.openExternal('https://github.com/otto-torino/electron-mockup/issues')
          }
        }
      ]
    }
  ])

  return menu
}

function createWindow () {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({ width: 1000, height: 600 })

  // Specify entry point
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  win.loadURL(startUrl)

  Menu.setApplicationMenu(createMenu(win))

  // Show dev tools
  // Remove this line before distributing
  // win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null
  })
}

app.on('ready', function () {
  createWindow()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('browser-window-created', function (e, window) {
  // window.setMenu(null)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
