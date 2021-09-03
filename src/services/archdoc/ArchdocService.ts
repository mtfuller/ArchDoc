import fs from 'fs/promises';
import * as yaml from 'js-yaml';
import Ajv from 'ajv';

import { ServiceMethod } from "../../transport/ServiceRegistry";
import { ArchdocSchemaType } from './schema/ArchdocSchema';
import IArchdocService from './IArchdocService';
import { ArchdocWorkspace } from './ArchdocWorkspace';
import { IArchdocSchema } from './schema/IArchdocSchema';

const ajv = new Ajv({code: {es5: true}});

export class ArchdocService implements IArchdocService {
    @ServiceMethod
    async loadArchdocFile(filePath: string): Promise<IArchdocSchema | null> {
        const validate = ajv.compile(ArchdocSchemaType);

        let yamlSpec: object = {};
        try {
            const fileContents = (await fs.readFile(filePath)).toString();

            const yamlModel = yaml.load(fileContents);

            if (typeof yamlModel === "object" && yamlModel !== null) {
                yamlSpec = yamlModel;
            }
        } catch (err) {
            console.log(err);
            return null;
        }

        if (validate(yamlSpec)) {
            const archdocSchema = <IArchdocSchema> yamlSpec;

            const workspace = new ArchdocWorkspace(filePath);

            const finalArchdocSchema = workspace.parseArchdocSchemaProperties(archdocSchema);

            return finalArchdocSchema;
        } else {
            console.log(validate.errors);
        }

        return null;
    }
}
