export default class RegisteredService {
    instance: Object;
    methods: Set<String> = new Set();

    constructor(instance: Object) {
        this.instance = instance;
    }

    addMethod(name: string) {
        this.methods.add(name);
    }

    getMethods() {
        return Array.from(this.methods.values());
    }
}