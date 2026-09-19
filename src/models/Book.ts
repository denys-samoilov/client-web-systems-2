export class Book implements IBook{
    private name: string;
    private author: string;
    private year: number;
    private status: string;

    constructor(name: string, author: string, year: number, status: string = 'available') {
        this.name = name;
        this.author = author;
        this.year = year;
        this.status = status;
    }

    public getName(): string { return this.name; }
    public getAuthor(): string { return this.author; }
    public getYear(): number { return this.year; }
    public getStatus(): string { return this.status; }

    public setStatus(status: string): void {
        this.status = status;
    }
}
