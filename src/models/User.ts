import { Book } from "./Book.ts";

export class User implements IUser{
    private id: number;
    private name: string;
    private email: string;
    private borrowedBooks: number[];

    constructor(generatedId: number, name: string, email: string, borrowedBooks: number[] = [])
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

    getBorrowedBooks(): number[] {
        return this.borrowedBooks;
    }

    hasStorageToBorrowBook(): boolean {
        return this.borrowedBooks.length <3;
    }

    setBorrowedBook(book: Book): void {
        this.borrowedBooks.push(book.getId());
    }

    removeBorrowedBook(bookId: number): void {
        this.borrowedBooks = this.borrowedBooks.filter(
            (borrowedBookId) => borrowedBookId !== bookId);
    }

}