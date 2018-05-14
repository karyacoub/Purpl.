/* main.js */

// CSS: https://templated.co/embellished

const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// set environment
process.env.NODE_ENV = 'production';

let loginWindow;
let mainWindow;

app.on('ready', function()
{
    // Create new window
    loginWindow = new BrowserWindow({
        width: 600,
        height: 770,
        title: 'Purpl.'
    });

    // login screen doesn't need a context menu, but it is present by default, so remove it
    loginWindow.setMenu(null);

    // Load html into window
    // url.format() formats the url as follows:
    //   file://dirname/loginWindow.html
    loginWindow.loadURL(url.format(
        {
            pathname: path.join(__dirname, 'loginWindow.html'),
            protocol: 'file:',
            slashes: true
        }
    ));

    // quit app when closed
    loginWindow.on('closed', function()
    {
        // only quit the app if user has not logged in
        if(mainWindow == null)
            app.quit();
        else
            loginWindow = null; // to aid with garbage collection
    });
});

// successful logon event handler
ipcMain.on('login-button-success', function(e){
    // Create main window
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        title: 'Purpl.'
    });

    mainWindow.loadURL(url.format(
        {
            pathname: path.join(__dirname, 'mainWindow.html'),
            protocol: 'file:',
            slashes: true
        }
    ));

    mainWindow.on('close', function(){
        app.quit();
    });

    // close login window
    loginWindow.close();
});