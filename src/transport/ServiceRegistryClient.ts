// @ts-ignore: Unreachable code error
const environment = ENV;

let ipcRenderer: any = {};
if (environment !== 'DEV') {
    ipcRenderer = require("electron").ipcRenderer;
}

export function serviceClientFactory<T>(name: string): T {
    const client: any = {};

    if (environment === 'DEV') {
        return client;
    }

    const serviceMethods = ipcRenderer.sendSync(name);

    serviceMethods.forEach(serviceMethod => {
        const channel = `${name}.${serviceMethod}`;

        client[serviceMethod] = (...args: any[]): any => {
            return ipcRenderer.sendSync(channel, ...args);
        };
    });

    return client;
}