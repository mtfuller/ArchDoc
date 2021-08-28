import { JSONSchemaType } from 'ajv';
import { ComponentTypes } from './ComponentTypes';
import { IArchdocSchema } from './IArchdocSchema';


export const ArchdocSchemaType: JSONSchemaType<IArchdocSchema> = {
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
                        description: {type: 'string'},
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
