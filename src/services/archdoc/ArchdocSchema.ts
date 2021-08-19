import { JSONSchemaType } from 'ajv';

export enum ComponentTypes {
    USER = "user",
    SERVICE = "service"
}

export interface IComponentSchema {
    type: ComponentTypes,
    uses: string[]
}

export interface IArchdocSchema {
    version: string
    components: Record<string, IComponentSchema>
}

export const ArchdocSchema: JSONSchemaType<IArchdocSchema> = {
    type: "object",
    properties: {
        version: {type: "string"},
        components: {
            type: "object",
            patternProperties: {
                "^.*$": {
                    type: "object",
                    properties: {
                        type: {type: 'string', enum: [ComponentTypes.USER, ComponentTypes.SERVICE]},
                        uses: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["type"],
                    additionalProperties: false
                }
            },
            required: [],
            additionalProperties: false
        }
    },
    required: ["version", "components"],
    additionalProperties: false,
}
