export default interface IWindowService {
    minimize(): Promise<boolean>;
    maximize(): Promise<boolean>;
    close(): Promise<boolean>
}