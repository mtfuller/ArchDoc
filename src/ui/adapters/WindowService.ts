import IWindowService from '../../services/window/IWindowService';
import { serviceClientFactory } from '../../transport/ServiceRegistryClient';

export default serviceClientFactory<IWindowService>("WindowService");
