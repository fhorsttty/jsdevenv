import { BrowserWindow } from 'electron';
import url from 'url';
import path from 'path';

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 800, height: 600 });
    this.window.loadURL(url.format({
      pathname: path.join(__dirname, '/../../../index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;
