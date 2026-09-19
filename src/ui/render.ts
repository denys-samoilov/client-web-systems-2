import { Header } from './components/Header.ts';
import { UserForm } from './components/UserForm.ts';
import { BookForm } from './components/BookForm.ts';
import { BookList } from './components/BookList.ts';
import { UserList } from './components/UserList.ts'; 

export class PageRenderer{

    private headerContainer = new Header()
    private userFormContainer = new UserForm();
    private bookFormContainer = new BookForm();
    private bookListContainer = new BookList();
    private userListContainer = new UserList();

    public renderPage(): string{
        return this.headerContainer.render() + this.userFormContainer.render() + this.bookFormContainer.render() + this.bookListContainer.render() + this.userListContainer.render();
    }
}