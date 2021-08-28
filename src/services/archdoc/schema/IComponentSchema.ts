import { ComponentTypes } from "./ComponentTypes";

export interface IComponentSchema {
    type: ComponentTypes,
    description: string,
    uses: string[]
}
