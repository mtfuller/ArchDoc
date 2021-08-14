import { ServiceMethod } from "../../transport/ServiceRegistry";
import { ComponentTypes, ArchdocModel, IComponent} from "./Archdoc.model";
import IArchdocService from "./IArchdocService";
import fs from 'fs/promises';
import * as yaml from 'js-yaml';
import Ajv, {JSONSchemaType} from 'ajv';

const ajv = new Ajv({code: {es5: true}});

interface ComponentSchemaType {
    type: ComponentTypes,
    uses: string[]
}

interface ArchdocSchemaType {
    version: string
    components: Record<string, ComponentSchemaType>
}
  
  const ArchdocSchema: JSONSchemaType<ArchdocSchemaType> = {
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

// interface MyType {
//     version: string;
//     //components: any;
// }


// const archdocSchema: JSONSchemaType<MyType> = {
//     properties: {
//         version: {type: "string"},
//         // components: {
//         //     patternProperties: {
//         //         "^.*$": {
//         //             type: 'object',
//         //             properties: {
//         //                 type: {type: 'string', enum: ["user", "service"]},
//         //                 uses: {
//         //                     type: "array",
//         //                     items: {
//         //                         type: "string"
//         //                     }
//         //                 }
//         //             },
//         //             required: ["type"]
//         //         }
//         //     },
//         //     additionalProperties: false
//         // }
//     },
//     required: ["version"],
//     additionalProperties: false,
//     //required: ["version", "components"]
// }

export class ArchdocService implements IArchdocService {
    @ServiceMethod
    async loadArchdocFile(filePath: string): Promise<ArchdocModel | null> {
        console.log(`Main thread recieved path: ${filePath}`);

        const validate = ajv.compile<ArchdocSchemaType>(ArchdocSchema);

        let archdoc: object|null = null;
        try {
            const fileContents = await (await fs.readFile(filePath)).toString();
            console.log(fileContents);

            const yamlModel = yaml.load(fileContents);
            console.log(yamlModel);

            if (typeof yamlModel === "object" && yamlModel !== null) {
                archdoc = yamlModel;
            }
        } catch (err) {
            return null;
        }

        console.log(`Archdoc:`);
        console.log(archdoc);


        if (validate(archdoc)) {
            console.log("Success!");

            const validatedArchdoc: ArchdocSchemaType = <ArchdocSchemaType> archdoc;

            const archdocModel = new ArchdocModel();
            archdocModel.version = validatedArchdoc.version;

            const componentNames = Object.keys(validatedArchdoc.components);

            archdocModel.components = componentNames.map((name) => {
                const component = validatedArchdoc.components[name];
                const type = (component.type === ComponentTypes.USER) ? ComponentTypes.USER : ComponentTypes.SERVICE;
                return {
                    name,
                    type,
                    uses: (component.uses !== undefined) ? component.uses : []
                }
            });

            console.log(archdocModel);
    
            return archdocModel;

        } else {
            console.log("Failures");
            console.log(validate.errors);
        }

        return null;
    }
}