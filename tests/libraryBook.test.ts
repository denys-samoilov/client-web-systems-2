import { expect } from 'chai';
import { Library } from '../src/services/Library.ts';
import { Book } from '../src/models/Book.ts';

const mockStorage: { [key: string]: string } = {};
global.localStorage = {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, value: string) => { mockStorage[key] = value; },
    removeItem: (key: string) => { delete mockStorage[key]; },
    clear: () => { Object.keys(mockStorage).forEach(key => delete mockStorage[key]); },
    length: 0,
    key: (_index: number) => null
};

describe('Library<Book> Testing', () => {
    const book1: Book = new Book(1, `LOTR`, `J. R. R. Tolkien`, 2023, `available`);
    const book2: Book = new Book(2, `Hobbit`, `J. R. R. Tolkien`, 2023, `available`);
    let bookLib: Library<Book>;



    beforeEach(() => {
        global.localStorage.clear();
        bookLib = new Library<Book>(`library_books`);

        bookLib.add(book1);
        bookLib.add(book2);
    });

    it('returns book array when called getAll method', () => {
        const bookArray: Book[] = [book1, book2];
        const result = bookLib.getAll();

        expect(result).to.deep.equal(bookArray); 


    });

    it('returns book when called getById method', () => {
        const result = bookLib.getById(1);

        expect(result).to.deep.equal(book1); 
    });

    it('returns book when called getByName method', () => {
        const result = bookLib.getByName("LOTR");
        const expectedArr: Book[] = [book1];

        expect(result).to.deep.equal(expectedArr); 
    });

    it('deletes book when called remove method', () => {
        bookLib.remove(1);        

        expect(bookLib.getById(1)).to.deep.equal(undefined); 
    });



    

}
);