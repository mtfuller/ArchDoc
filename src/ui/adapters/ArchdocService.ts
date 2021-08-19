import IArchdocService from '../../services/archdoc/IArchdocService';
import { serviceClientFactory } from '../../transport/ServiceRegistryClient';

export default serviceClientFactory<IArchdocService>("ArchdocService");
