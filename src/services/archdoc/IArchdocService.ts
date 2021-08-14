import { ArchdocModel } from "./Archdoc.model";

export default interface IArchdocService {
    loadArchdocFile(filePath: string): Promise<ArchdocModel | null>;
}