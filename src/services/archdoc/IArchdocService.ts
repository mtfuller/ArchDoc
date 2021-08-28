import { IArchdocSchema } from "./schema/IArchdocSchema";

export default interface IArchdocService {
    loadArchdocFile(filePath: string): Promise<IArchdocSchema | null>;
}
