import { expect } from 'chai';
import { Library } from '../src/services/Library.ts';
import { User } from '../src/models/User.ts';

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
    const user1: User = new User(1, `Denys`, `qwerty@gmail.com`);
    const user2: User = new User(2, `Will`, `123@gmail.com`);
    let userLib: Library<User>;



    beforeEach(() => {
        global.localStorage.clear();
        userLib = new Library<User>(`library_users`);

        userLib.add(user1);
        userLib.add(user2);
    });

    it('returns user array when called getAll method', () => {
        const bookArray: User[] = [user1, user2];
        const result = userLib.getAll();

        expect(result).to.deep.equal(bookArray); 


    });

    it('returns user when called getById method', () => {
        const result = userLib.getById(1);

        expect(result).to.deep.equal(user1); 
    });

    it('returns user when called getByName method', () => {
        const result = userLib.getByName("Denys");
        const expectedArr: User[] = [user1];
        
        expect(result).to.deep.equal(expectedArr); 
    });

    it('deletes user when called remove method', () => {
        userLib.remove(1);        

        expect(userLib.getById(1)).to.deep.equal(undefined); 
    });



    

}
);