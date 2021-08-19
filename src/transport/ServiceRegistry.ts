import { ipcMain } from "electron";
import RegisteredService from "./RegisteredService";

class ServiceRegistry {
    registeredServices: Map<String, RegisteredService> = new Map();
    channelToHandlerMap: Map<String, Function> = new Map();

    addService(name: string, service: any) {
        this.registeredServices.set(name, service);
    }

    registerServiceMethod<T>(constructor: any, methodName: string) {
        console.log(`EventTransport::registerServiceMethod`);
        const serviceName = constructor.name;

        console.log(`EventTransport::registerServiceMethod - Checking to see if ${serviceName} exists...`);
        if (!this.registeredServices.has(serviceName)) {
            console.log(`EventTransport::registerServiceMethod - It does not. Creating...`);
            this.registeredServices.set(serviceName, new RegisteredService(new constructor()));

            const service = this.registeredServices.get(serviceName);

            ipcMain.on(serviceName, (event, args) => {
                console.log(`EventTransport::registerServiceMethod - Received event for ${serviceName} with args: ${args}`);
                event.returnValue = service?.getMethods();
            });
        }

        const methodChannel = `${serviceName}.${methodName}`;
        console.log(`EventTransport::registerServiceMethod - Registering ${methodChannel}...`);

        this.registeredServices.get(serviceName)?.addMethod(methodName);
        ipcMain.on(methodChannel, async (event, args) => {
            console.log(`EventTransport::registerServiceMethod - Received event for ${methodChannel} with args: ${args} (${typeof args})`);
            const value = await this.registeredServices.get(serviceName)?.instance[methodName](args);
            console.log(`EventTransport::registerServiceMethod - ret: ${value} (${typeof value})`);
            event.returnValue = value;
        });

        console.log(this.registeredServices);
    }
}

const serviceRegistry = new ServiceRegistry();

export function ServiceMethod(target: any, name: any, desc: any) {
    console.log(target, name, desc);
    console.log(`@ServiceMethod - Attempting to register ${target.constructor.name}.${name}...`);
    serviceRegistry.registerServiceMethod(target.constructor, name);
}