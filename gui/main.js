const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1366,
        height: 55,
        x: 0,
        y: 768-55, // o calculo é: [height da sua tela] - 55(tamanho da taskbar)
        titleBarStyle: 'hidden',
        alwaysOnTop: true,
    });

    win.loadFile('./dist/gui/browser/index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
});