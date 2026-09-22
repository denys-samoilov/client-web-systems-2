import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal as BModal } from 'bootstrap';

import { PageRenderer } from './ui/render.ts';
import { BookForm } from './ui/components/BookForm.ts';
import { UserForm } from './ui/components/UserForm.ts';
import { Library } from './services/Library.ts';
import { Book } from './models/Book.ts';
import { User } from './models/User.ts';
import { IdGenerator } from './utils/idGenerator.ts';
import { BookService } from './services/BookService.ts';
import { Validator } from './utils/validators.ts';
import { BookList } from './ui/components/BookList.ts';

class App {
  private renderer = new PageRenderer();
  private bookForm = new BookForm();
  private userForm = new UserForm();
  private idGenerator = new IdGenerator();

  private bookLibrary = new Library<Book>('library_books');
  private userLibrary = new Library<User>('library_users');

  private borrowBootstrapModal: BModal | null = null;

  private bookCurrentPage: number = 1;
  private readonly bookPageSize: number = 5; 
  private currentSearchQuery: string = '';

  constructor() {
    this.bookHandler();

    this.updateUI();

    this.setupSearchListener();

    this.deleteHandler();

    this.setupPaginationListener();
  }

  private updateUI(): void {
    const rootContainer = document.getElementById('app');

    if (rootContainer) {

      const filteredBooks = this.currentSearchQuery
                ? (this.bookLibrary.getByName(this.currentSearchQuery) as unknown as Book[])
                : this.bookLibrary.getAll();

      const totalBooksCount = filteredBooks.length;

      const startIndex = (this.bookCurrentPage - 1) * this.bookPageSize;
      const endIndex = startIndex + this.bookPageSize;
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

      rootContainer.innerHTML = this.renderer.renderPage(
                paginatedBooks, 
                this.userLibrary.getAll(),
                totalBooksCount,
                this.bookCurrentPage,
                this.bookPageSize
            );    

      const searchInput = document.getElementById('book-search-input') as HTMLInputElement | null;
            if (searchInput && this.currentSearchQuery) {
                searchInput.value = this.currentSearchQuery;
                searchInput.focus();
                searchInput.setSelectionRange(this.currentSearchQuery.length, this.currentSearchQuery.length);
            }

      const modalElement = document.getElementById('borrowModal');
      if (modalElement) {
        this.borrowBootstrapModal = new BModal(modalElement);
      }

      this.validateForms();
    }
  }

  private validateForms(): void {
    this.bookForm.validateForm((name, author, year) => {
      const newBook = new Book(this.idGenerator.generateBookId(), name, author, year);

      this.bookLibrary.add(newBook);

      this.updateUI();
    });

    this.userForm.validateForm((name, email) => {
      const newUser = new User(this.idGenerator.generateUserId(), name, email);

      this.userLibrary.add(newUser);

      this.updateUI();
    });
  }

  private bookHandler(): void {
    let activeBookId: number = 0;
    const bookService = new BookService(this.bookLibrary);

    document.body.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('book-action-btn')) {
        const idString = target.getAttribute('data-id');
        if (!idString) return;

        const bookId = parseInt(idString, 10);

        const book = this.bookLibrary.getById(bookId);

        if (!book) return;

        if (book.getStatus() === 'available') {
          activeBookId = bookId;

          const modalInput = document.getElementById('modal-user-id') as HTMLInputElement | null;
          if (modalInput) {
            modalInput.classList.remove('is-invalid');
            modalInput.value = '';
          }

          this.borrowBootstrapModal.show();
        } else {
          const user = this.userLibrary.getById(book.getUser());
          const isReturned = bookService.returnBook(bookId);
          const userId = user?.getId();
          if (isReturned && user && userId !== undefined) {
            user.removeBorrowedBook(bookId);

            console.log(user);

            this.bookLibrary.remove(book.getId());
            this.bookLibrary.add(book);

            this.userLibrary.remove(userId);
            this.userLibrary.add(user);
          }
          this.updateUI();
        }
      }

      if (target.id === 'modal-submit-btn') {
        const modalInput = document.getElementById('modal-user-id') as HTMLInputElement | null;
        if (!modalInput || !activeBookId) return;

        const idString = modalInput.value.trim();

        const validId = Validator.isValidId(idString);
        modalInput.classList.toggle('is-invalid', !validId);

        if (validId) {
          const userId = parseInt(idString, 10);
          const userExists = this.userLibrary.getAll().some((user) => user.getId() === userId);

          if (!userExists) {
            const feedback = document.getElementById('modal-id-feedback');
            if (feedback) feedback.textContent = 'Користувача з таким ID не знайдено';
            modalInput.classList.add('is-invalid');
            return;
          }

          const user = this.userLibrary.getById(userId);

          const userHasEnoughSpace = user?.hasStorageToBorrowBook();

          if (userHasEnoughSpace) {
            const isBorrowed = bookService.borrowBook(activeBookId);

            if (isBorrowed) {
              const book = this.bookLibrary.getById(activeBookId);
              book?.setUserId(userId);
              if (book) {
                user?.setBorrowedBook(book);
                this.bookLibrary.remove(book.getId());
                this.bookLibrary.add(book);

                this.userLibrary.remove(user!.getId());
                this.userLibrary.add(user!);
              }
              console.log(`Книгу "${activeBookId}" успішно видано користувачу з ID: ${userId}`);
            }
          } else {
            const feedback = document.getElementById('modal-id-feedback');
            if (feedback) feedback.textContent = 'Користувач вже має 3 книги';
            modalInput.classList.add('is-invalid');
            return;
          }

          this.borrowBootstrapModal.hide();
          this.updateUI();
        }
      }
    });
  }

  private setupSearchListener(): void {
    document.body.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.id === 'book-search-input') {
        this.currentSearchQuery = target.value.trim().toLowerCase();
        const listContainer = document.getElementById('dynamic-book-list-container');

        if (!listContainer) return;

        if (!this.currentSearchQuery) {
          this.updateUI();
          return;
        }

        const filteredBooks = this.bookLibrary.getByName(this.currentSearchQuery);

        if (!filteredBooks) return;

        const bookListForm = new BookList();

        listContainer.innerHTML = bookListForm.renderBooks(filteredBooks);

        this.currentSearchQuery = target.value.trim();
        this.bookCurrentPage = 1;
        this.updateUI();
      }
    });
  }

  private deleteHandler(): void {
    document.body.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('book-delete-btn')) {
        const idString = target.getAttribute('data-id');
        if (!idString) return;

        const bookId = parseInt(idString, 10);

        const book = this.bookLibrary.getById(bookId);

        if (book?.getUser() === -1) {
          this.bookLibrary.remove(bookId);
          this.updateUI();
        }
      }

      if (target.classList.contains('user-delete-btn')) {
        const idString = target.getAttribute('data-id');
        if (!idString) return;

        const userId = parseInt(idString, 10);

        const user = this.userLibrary.getById(userId);

        if (user) {
          if (user.getBorrowedBooks().length === 0) {
            this.userLibrary.remove(userId);
            this.updateUI();
          }
        }
      }
    });
  }

  private setupPaginationListener(): void {
        document.body.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;

            if (target.classList.contains('book-page-btn')) {
                const targetPageAttr = target.getAttribute('data-page');
                if (!targetPageAttr) return;

                this.bookCurrentPage = parseInt(targetPageAttr, 10);
                this.updateUI();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
