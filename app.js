const { app, BrowserWindow } = require('electron');

let bw;

function createWindow() {
	bw = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		icon: __dirname + '/icon.png'
	});

	bw.loadFile('app.html');

	bw.on('closed', () => {
		bw = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if(bw === null) {
		createWindow();
	}
});