const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let loginWindow;
let registerWindow;

// Listen for app to be ready
app.on('ready', function(){
	//Login new window
	loginWindow = new BrowserWindow({
		width: 500,
		height: 600,
		title: 'User Registration'
	});
	//load html file into a window
	loginWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'view/loginWindow.html'),
		protocol: 'file:',
		slashes: true
	}));

	loginWindow.webContents.openDevTools()

	//Quit app when closed
	loginWindow.on('close', function(){
		app.quit();
	});

	//Build menu from template
	const loginMenu = Menu.buildFromTemplate(mainMenuTemplate);
	//Insert menu
	Menu.setApplicationMenu(loginMenu);
});

	//Handle Register Window
	function createRegisterWindow(){
		//Register new window
		registerWindow = new BrowserWindow({
			width: 500,
			height: 600,
			title: 'User Registration'
		});
		//load html file into a window
		registerWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'view/registerWindow.html'),
			protocol: 'file:',
			slashes: true
		}));

		registerWindow.webContents.openDevTools()

		//Garbage collection handle
		registerWindow.on('close', function(){
			registerWindow = null;
		});

		ipcMain.on('register:submit', (e, path) => {
			console.log(path)
		});

	}


	//Create menu template
	const mainMenuTemplate = [
	{
		label:'File',
		submenu: [
			{
				label: 'Register',
				click(){
					createRegisterWindow();
				}
			},
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
