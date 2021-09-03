import { ServiceMethod } from "../../transport/ServiceRegistry";
import IWindowService from "./IWindowService";
import Window from './Window';

export class WindowService implements IWindowService {
    @ServiceMethod
    async minimize(): Promise<boolean> {
        console.log(`WindowService::minimize`)
        const win = Window.getInstance();

        if (!win.isMinimizable()) return false;

        win.minimize();

        return true;
    }

    @ServiceMethod
    async maximize(): Promise<boolean> {
        const win = Window.getInstance();
        
        if (!win.isMaximizable()) return false;

        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }

        return true;
    }

    @ServiceMethod
    async close(): Promise<boolean> {
        const win = Window.getInstance();

        if (!win.isClosable()) return false;

        win.close();

        return true;
    }
}