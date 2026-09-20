import { Book } from "./Book.ts";

export class User implements IUser{
    private id: number;
    private name: string;
    private email: string;
    private borrowedBooks: Book[];

    constructor(generatedId: number, name: string, email: string, borrowedBooks: Book[] = [])
    {
        this.id = generatedId;
        this.name = name;
        this.email = email;
        this.borrowedBooks = borrowedBooks;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getBorrowedBooks(): Book[] {
        return this.borrowedBooks;
    }
}