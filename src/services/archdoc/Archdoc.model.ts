export enum ComponentTypes {
    USER = "user",
    SERVICE = "service"
}

export interface IComponent {
    name: string;
    type: ComponentTypes;
    uses: string[];
}

export class ArchdocModel {
    public version: string;
    public components: IComponent[]

    constructor () {}
}
