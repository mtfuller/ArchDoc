import { IArchdocSchema } from "./ArchdocSchema";

export default interface IArchdocService {
    loadArchdocFile(filePath: string): Promise<IArchdocSchema | null>;
}
