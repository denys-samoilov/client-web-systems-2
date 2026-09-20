export class IdGenerator{
    private currentId: number;

    constructor(){
        let savedId = localStorage.getItem("currentId");
        this.currentId = savedId ? Number.parseInt(savedId, 10) : 0;
        }

    public generateId(): number{
        this.currentId++;
        localStorage.setItem("currentId", this.currentId.toString());
        return this.currentId;
    }
}