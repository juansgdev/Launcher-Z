const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        transparent: true,
        frame: false
    });

    win.loadFile('./dist/gui/browser/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
});