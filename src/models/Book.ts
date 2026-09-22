import type { User } from './User';

export class Book implements IBook {
  private id: number;
  private name: string;
  private author: string;
  private year: number;
  private status: string;
  private userId: number;

  constructor(
    id: number,
    name: string,
    author: string,
    year: number,
    status: string = 'available',
    userId: number = -1
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.year = year;
    this.status = status;
    this.userId = userId;
  }

  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public getAuthor(): string {
    return this.author;
  }
  public getYear(): number {
    return this.year;
  }
  public getStatus(): string {
    return this.status;
  }
  public getUser(): number {
    return this.userId;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public setUserId(userId: number): void {
    this.userId = userId;
  }
}
