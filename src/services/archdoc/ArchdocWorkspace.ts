import { IArchdocSchema } from "./schema/IArchdocSchema";
import fs from 'fs/promises';
import path from 'path';

type PureStringFunction = (value: string) => Promise<string>;

const FUNCTION_PATTERN = /^\$([A-Za-z0-9]+)\((.*)\)$/;



export class ArchdocWorkspace {
    workingDirectory: string
    nameToArchdocFunction: Record<string, PureStringFunction>

    constructor(workingDirectory) {
        this.workingDirectory = workingDirectory;

        this.nameToArchdocFunction = {
            file: this.file
        };

        console.log(`Working dir: ${this.workingDirectory}`);
    }

    private file = async (value: string): Promise<string> => {
        const fileContents = await fs.readFile(path.join(path.dirname(this.workingDirectory), value));
        return fileContents.toString();
    }

    private parseString = async (value: string): Promise<string> => {
        const matches = FUNCTION_PATTERN.exec(value);
    
        if (matches === null) {
            return value;
        }
    
        const functionName = matches[1];
        const argument = matches[2];
    
        const isValidFunction = Object.keys(this.nameToArchdocFunction).includes(functionName);
    
        if (!isValidFunction) {
            return value;
        }
    
        try {
            return await this.nameToArchdocFunction[functionName](argument);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            console.log(err);
            return value;
        }
    }

    async parseArchdocSchemaProperties(archdoc: IArchdocSchema): Promise<IArchdocSchema> {
        const { version, components } = archdoc;
    
        for (const name of Object.keys(components)) {
            const component = components[name];
    
            components[name].description = await this.parseString(component.description);
        }
    
        return {
            version,
            components
        }
    } 
    
}