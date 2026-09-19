// generic-клас Library<T>
interface Item{
    getName(): string;
}

export class Library<T extends Item> {
    private collection: T[] = [];

    public add(item: T): void{
        this.collection.push(item);
    }

    public getAll(): T[]{
        return [...this.collection];
    }

    public remove(name: string): void {
        this.collection = this.collection.filter(item => item.getName() !== name);
    }

    public getByName(name: string): T | undefined{
        return this.collection.find(item => item.getName() === name);
    }
}
