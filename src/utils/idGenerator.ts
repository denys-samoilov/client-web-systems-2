export class IdGenerator{
    private currentBookId: number;
    private currentUserId: number;

    constructor(){
        let savedBookId = localStorage.getItem("currentBookId");
        let savedUserId = localStorage.getItem("currentUserId")
        this.currentBookId = savedBookId ? Number.parseInt(savedBookId, 10) : 0;
        this.currentUserId = savedUserId ? Number.parseInt(savedUserId, 10) : 0;
        }

    public generateBookId(): number{
        this.currentBookId++;
        localStorage.setItem("currentBookId", this.currentBookId.toString());
        return this.currentBookId;
    }

    public generateUserId(): number{
        this.currentUserId++;
        localStorage.setItem("currentUserId", this.currentUserId.toString());
        return this.currentUserId;
    }
}