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

class App {
  private renderer = new PageRenderer();
  private bookForm = new BookForm();
  private userForm = new UserForm();
  private idGenerator = new IdGenerator();

  private bookLibrary = new Library<Book>('library_books');
  private userLibrary = new Library<User>('library_users');

  private borrowBootstrapModal: BModal | null = null;

  constructor() {
    this.bookHandler();

    this.updateUI();

    this.setupSearchListener();
  }

  private updateUI(): void {
    const rootContainer = document.getElementById('app');

    if (rootContainer) {
      rootContainer.innerHTML = this.renderer.renderPage(
        this.bookLibrary.getAll(),
        this.userLibrary.getAll()
      );

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
      console.log(`Успішно створено об'єкт книги:`, newBook);

      this.updateUI();
    });

    this.userForm.validateForm((name, email) => {
      const newUser = new User(this.idGenerator.generateUserId(), name, email);

      this.userLibrary.add(newUser);
      console.log(`Успішно створено об'єкт користувача:`, newUser);

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
        const query = target.value.trim().toLowerCase();
        const allBooks = this.bookLibrary.getAll();
        const listContainer = document.getElementById('dynamic-book-list-container');

        if (!listContainer) return;

        if (!query) {
          this.refreshBookListDOM(allBooks, listContainer);
          return;
        }

        const filteredBooks = this.bookLibrary.getByName(query);

        if (!filteredBooks) return;

        this.refreshBookListDOM(filteredBooks, listContainer);
      }
    });
  }

  private refreshBookListDOM(books: Book[], container: HTMLElement): void {
    let html = '';
    for (const book of books) {
      const isBorrowed = book.getStatus() === 'borrowed';
      html += `
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                    <div class="text-dark">
                        <strong>${book.getName()}</strong> by ${book.getAuthor()} (${book.getYear()})
                    </div>
                    <button class="btn ${isBorrowed ? 'btn-warning' : 'btn-primary'} px-3 py-1 btn-sm fw-medium book-action-btn" data-id="${book.getId()}">
                        ${isBorrowed ? 'Повернути' : 'Позичити'}
                    </button>
                </div>
            `;
    }
    container.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
