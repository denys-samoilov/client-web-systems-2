// точка входу, збирає все разом

// import all modules here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// etc.

class App {
    constructor() {
        const rootContainer = document.getElementById('app');

        if (rootContainer) {
            rootContainer.innerHTML = this.renderPage();
        }
    }

    private renderHeader(): string {
        return '<h1 class = "text-center mt-5 fw-bold">Система управління бібліотекою</h1>'
    }

     private renderAddBookElement(): string {
        return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-10">
                        
                        <div class="card p-4 shadow-sm border-0 rounded bg-white">
                            <div class="card-body">
                                
                                <h2 class="card-title fw-bold text-dark mb-4">Додати Книгу</h2>
                                
                                <form id="add-book-form">
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-name" placeholder="Назва книги">
                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-author" placeholder="Автор">
                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-year" placeholder="Рік видання">
                                    </div>
                                    
                                    <button type="submit" class="btn btn-success px-4 py-2">
                                        Додати Книгу
                                    </button>
                                    
                                </form>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
     }

    private renderPage(): string{
        return this.renderHeader() + this.renderAddBookElement();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
