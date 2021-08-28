import { IComponentSchema } from "./IComponentSchema";

export interface IArchdocSchema {
    version: string
    components: Record<string, IComponentSchema>
}
