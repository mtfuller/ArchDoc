import { ServiceMethod } from "../../transport/ServiceRegistry";
import ArchdocModel from "./Archdoc.model";
import IArchdocService from "./IArchdocService";

export class ArchdocService implements IArchdocService {
    @ServiceMethod
    loadArchdocFile(filePath: string): ArchdocModel {
        throw new Error("Method not implemented.");
    }
}