const { app, BrowserWindow } = require('electron')
const path = require('path')

let win;
let display_width;
let display_height;

function createWindow() {
    const win = new BrowserWindow({
        webSecurity: false,
        allowRunningInsecureContent: true,
        x: 0,
        y: 0,
        width: 720,
        height: 640,
        focusable: false,
        transparent: true,
        frame: false,
        fullscreen: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        enableLargerThanScreen: false,
        webPreferences: {
            preload: path.join(__dirname, './js/preload.js'),
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
        }
    })

    win.setSize(1024, 768);

    //add mouse press through
    win.setIgnoreMouseEvents(false);

    // Open the DevTools.
    win.webContents.openDevTools();

    win.loadFile('index.html')
}

app.allowRendererProcessReuse = false

//enable hardware acceleration
app.disableHardwareAcceleration(true);

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
