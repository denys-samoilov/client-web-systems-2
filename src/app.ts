// точка входу, збирає все разом

// import all modules here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { PageRenderer } from './ui/render.ts';
import { BookForm } from './ui/components/BookForm.ts';
import { UserForm } from './ui/components/UserForm.ts';

class App {
    private renderer = new PageRenderer();
    private bookForm = new BookForm();
    private userForm = new UserForm();

    constructor() {
        const rootContainer = document.getElementById('app');

        if (rootContainer) {
            rootContainer.innerHTML = this.renderer.renderPage();
            this.bookForm.validateForm();
            this.userForm.validateForm();
        }
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
