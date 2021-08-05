import { ServiceMethod } from "../../transport/ServiceRegistry";
import ICounterService from "./ICounterService";

export class CounterService implements ICounterService {
    counter: number = 0;

    @ServiceMethod
    increment(value: number): number {
        console.log(`CounterService::increment`);
        console.log(this);
        this.counter += value;

        return this.counter
    }

    @ServiceMethod
    decrement(value: number): number {
        console.log(`CounterService::decrement`);
        this.counter -= value;

        return this.counter
    }
}