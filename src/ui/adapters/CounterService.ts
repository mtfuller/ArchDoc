import ICounterService from '../../services/counter/ICounterService';
import { serviceClientFactory } from '../../transport/ServiceRegistryClient';

export default serviceClientFactory<ICounterService>("CounterService");