import { ipcRenderer } from "electron";

export function serviceClientFactory<T>(name: string): T {
    const client: any = {};

    const serviceMethods = ipcRenderer.sendSync(name);

    serviceMethods.forEach(serviceMethod => {
        const channel = `${name}.${serviceMethod}`;

        client[serviceMethod] = (...args: any[]): any => {
            return ipcRenderer.sendSync(channel, ...args);
        };
    });

    return client;
}