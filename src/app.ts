// точка входу, збирає все разом
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { PageRenderer } from './ui/render.ts';
import { BookForm } from './ui/components/BookForm.ts';
import { UserForm } from './ui/components/UserForm.ts';
import { Library } from './services/Library.ts';
import { Book } from './models/Book.ts';

class App {
    private renderer = new PageRenderer();
    private bookForm = new BookForm();
    private userForm = new UserForm();

    private bookLibrary = new Library<Book>('library_books');

    constructor() {
        this.updateUI();
    }

    
    private updateUI(): void {
        const rootContainer = document.getElementById('app');

        if (rootContainer) {
            rootContainer.innerHTML = this.renderer.renderPage(this.bookLibrary.getAll());
            
            this.bookForm.validateForm((name, author, year) => {
                const newBook = new Book(name, author, year);
                
                this.bookLibrary.add(newBook);
                
                console.log(`Успішно створено об'єкт книги:`, newBook);
                
                this.updateUI(); 
            });

        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
