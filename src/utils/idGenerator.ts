import { Library } from "../services/Library";

class IdGenerator{
    private currentId: number = 0;

    public generateId(): number{
        this.currentId++;
        return this.currentId;
    }
}