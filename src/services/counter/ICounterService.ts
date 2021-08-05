export default interface ICounterService {
    increment(value: number): number;
    decrement(value: number): number;
}