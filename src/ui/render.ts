import { Header } from './components/Header.ts';
import { UserForm } from './components/UserForm.ts';
import { BookForm } from './components/BookForm.ts';
import { BookList } from './components/BookList.ts';
import { UserList } from './components/UserList.ts';
import { Book } from '../models/Book.ts';
import type { User } from '../models/User.ts';
import { Modal } from './components/Modal.ts';

export class PageRenderer {
  private headerContainer = new Header();
  private userFormContainer = new UserForm();
  private bookFormContainer = new BookForm();
  private bookListContainer = new BookList();
  private userListContainer = new UserList();
  private modalContainer = new Modal();

  public renderPage(
    books: Book[],
    users: User[],
    totalBooksCount: number = 0,
    currentPage: number = 1,
    pageSize: number = 5
  ): string {
    return (
      this.headerContainer.render() +
      this.userFormContainer.render() +
      this.bookFormContainer.render() +
      this.bookListContainer.render(books, totalBooksCount, currentPage, pageSize) +
      this.userListContainer.render(users) +
      this.modalContainer.renderBorrowModal() +
      this.modalContainer.renderSuccessBorrowModal() +
      this.modalContainer.renderSuccessReturnModal()
    );
  }
}
