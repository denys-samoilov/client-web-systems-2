// generic-клас Library<T>
import { Storage } from "./Storage.ts";
import { Book } from "../models/Book.ts";

interface Item{
    getName(): string;
}

export class Library<T extends Item> {
    private collection: T[] = [];
    private storage: Storage = new Storage();
    private storageKey: string;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
        this.loadLocalData();
    }

    public add(item: T): void{
        this.collection.push(item);
        this.saveLocalData();
    }

    public getAll(): T[]{
        return [...this.collection];
    }

    public remove(name: string): void {
        this.collection = this.collection.filter(item => item.getName() !== name);
        this.saveLocalData();
    }

    public getByName(name: string): T | undefined{
        return this.collection.find(item => item.getName() === name);
    }

    private loadLocalData(): void {
        const rawData = this.storage.get<any[]>(this.storageKey);
        if (!rawData) return;

        for(let data of rawData){
            if(this.storageKey == "library_books"){
                const restoredBook = new Book(data.name, data.author, data.year, data.status);
                this.collection.push(restoredBook as unknown as T);
            }
        }
    }

    private saveLocalData(): void {
        this.storage.set(this.storageKey, this.collection);
    }
}
