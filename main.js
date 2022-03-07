const electron = require('electron');
const url = require('url');
const path = require('path');
require("dotenv").config();

// == Temporary ==
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// SEt ENV
process.env.NODE_ENV;

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
	//Login new window
	mainWindow = new BrowserWindow({
		webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
		frame: false,
		width: 1700,
		height: 1000,
		title: ''
	});

	//load html file into a window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'view/loginWindow.html'),
		protocol: 'file:',
		slashes: true
	}));


	mainWindow.webContents.openDevTools()

	//Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	//Insert menu
	Menu.setApplicationMenu(mainMenu);
});

	// Function to create integration window of parent one
	function createIntegrationWindow(url) {
	  integrationWindow = new BrowserWindow({
    	webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
		parent: mainWindow,
		frame:true,
		modal: true,
		width: 1000,
		height: 1200,
		title: 'New Window',
		resizable: true,
		fullscreenable: true
	  });
	  
	  // Integration window loads ajax response
	  integrationWindow.loadURL(url)

	  integrationWindow.webContents.openDevTools()
	  
	  integrationWindow.once('ready-to-show', () => {
	    integrationWindow.show();
	  });
	}
	  
	ipcMain.on('openIntegrationWindow', (event, url) => {
		createIntegrationWindow(url);
		integrationWindow.on('closed', function() {
			event.reply('store-data', 'Success')
		});
	});
	  
	// app.whenReady().then(() => {
	//   createWindow();
	  
	//   app.on("activate", () => {
	//     if (BrowserWindow.getAllWindows().length === 0) {
	//       createWindow();
	//     }
	//   });
	// });

	//Create menu template
	const mainMenuTemplate = [
	{
		label:'File',
		submenu: [
				{
					label:'Quit',
					accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
					click(){
						app.quit();
					}
				}
			]
		}
	];

// if mac, add empty object to menu
if(process.platform == 'darwin'){
	mainMenuTemplate.unshift({});
}
