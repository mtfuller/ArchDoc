import { BrowserWindow } from 'electron';

export default class Window {
    private static instance: BrowserWindow;
    private constructor() { }

    public static getInstance(): BrowserWindow {
        if (!Window.instance) {
            Window.instance = new BrowserWindow({
                width: 1024,
                height: 768,
                webPreferences: {
                  nodeIntegration: true,
                  contextIsolation: false,
                },
                frame: false
            });
        }

        return Window.instance;
    }
}