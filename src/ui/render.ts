import { Header } from './components/Header.ts';
import { UserForm } from './components/UserForm.ts';
import { BookForm } from './components/BookForm.ts';
import { BookList } from './components/BookList.ts';
import { UserList } from './components/UserList.ts'; 
import type { Book } from '../models/Book.ts';

export class PageRenderer{

    private headerContainer = new Header()
    private userFormContainer = new UserForm();
    private bookFormContainer = new BookForm();
    private bookListContainer = new BookList();
    private userListContainer = new UserList();

    public renderPage(books: Book[]): string{
        return this.headerContainer.render() + 
               this.userFormContainer.render() + 
               this.bookFormContainer.render() + 
               this.bookListContainer.render(books) + 
               this.userListContainer.render();
    }
}