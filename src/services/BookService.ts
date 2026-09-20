import { Library } from './Library.ts';
import { Book } from '../models/Book.ts';

export class BookService {
    private library: Library<Book>;

    constructor(library: Library<Book>) {
        this.library = library;
    }

    public borrowBook(id: number): boolean {
        const book = this.library.getById(id);
        if (book && book.getStatus() !== 'borrowed') {
            book.setStatus('borrowed');
            return true;
        }
        return false;
    }

    public returnBook(id: number): boolean {
        const book = this.library.getById(id);
        if (book && book.getStatus() === 'borrowed') {
            book.setStatus('available');
            book.setUserId(-1);
            return true;
        }
        return false;
    }
}