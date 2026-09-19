import { Library } from './Library.ts';
import { Book } from '../models/Book.ts';

export class BookService {
    private library: Library<Book>;

    constructor(library: Library<Book>) {
        this.library = library;
    }

    public borrowBook(name: string): boolean {
        const book = this.library.getByName(name);
        if (book && book.getStatus() !== 'borrowed') {
            book.setStatus('borrowed');
            return true;
        }
        return false;
    }

    public returnBook(name: string): boolean {
        const book = this.library.getByName(name);
        if (book && book.getStatus() === 'borrowed') {
            book.setStatus('available');
            return true;
        }
        return false;
    }
}