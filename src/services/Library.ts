// generic-клас Library<T>
import { Storage } from './Storage.ts';
import { Book } from '../models/Book.ts';
import { User } from '../models/User.ts';

interface Item {
  getId(): number;
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

  public add(item: T): void {
    this.collection.push(item);
    this.saveLocalData();
  }

  public getAll(): T[] {
    return [...this.collection];
  }

  public remove(id: number): void {
    this.collection = this.collection.filter((item) => item.getId() !== id);
    this.saveLocalData();
  }

  public getById(id: number): T | undefined {
    return this.collection.find((item) => item.getId() === id);
  }

  public getByName(name: string): T | undefined {
    return this.collection.find((item) => item.getName() === name);
  }


  private loadLocalData(): void {
    const rawData = this.storage.get<any[]>(this.storageKey);
    if (!rawData) return;

    for (const data of rawData) {
      if (this.storageKey == 'library_books') {
        const restoredBook = new Book(
          data.id,
          data.name,
          data.author,
          data.year,
          data.status,
          data.userId
        );
        this.collection.push(restoredBook as unknown as T);
      } else if (this.storageKey == 'library_users') {
        const restoredUser = new User(data.id, data.name, data.email, data.borrowedBooks);
        this.collection.push(restoredUser as unknown as T);
      }
    }
  }

  private saveLocalData(): void {
    this.storage.set(this.storageKey, this.collection);
  }
}
