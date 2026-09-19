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

     private renderAddUserElement(): string {
        return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-10">
                        
                        <div class="card p-4 shadow-sm border-0 rounded bg-white">
                            <div class="card-body">
                                
                                <h2 class="card-title fw-bold text-dark mb-4">Додати користувача</h2>
                                
                                <form id="add-user-form">
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="user-name" placeholder="Ім'я">
                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="user-email" placeholder="Email">
                                    </div>
                                    
                                    <button type="submit" class="btn btn-success px-4 py-2">
                                        Додати Користувача
                                    </button>
                                    
                                </form>
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>

    
        `;
    }

    private renderBookList(): string{
       return `
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-10">
                    
                    <div class="card shadow-sm border-0 rounded bg-white">
                        <div class="card-body p-4">
                            
                            <h2 class="card-title fw-bold text-dark mb-4">Список Книг</h2>
                            
                            <div class="list-group list-group-flush">
                                
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                                    <div class="text-dark">
                                        Code Complete by Steve McConnell (2004)
                                    </div>
                                    <button class="btn btn-primary px-3 py-1 btn-sm fw-medium">Позичити</button>
                                </div>     
                                
                                <div class="list-group-item d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                                    <div class="text-dark">
                                        I have no mouth and I must scream by Harlan Ellison (1967)
                                    </div>
                                    <button class="btn btn-warning px-3 py-1 btn-sm fw-medium">Повернути</button>
                                </div>   
                                
                            </div>                                                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
    }

    private renderUserList(): string{
        return `
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-10">
                    
                    <div class="card shadow-sm border-0 rounded bg-white">
                        <div class="card-body p-4">
                            
                            <h2 class="card-title fw-bold text-dark mb-4">Список Користувачів</h2>
                            
                            <div class="list-group list-group-flush"> 
                                
                                <div class="list-group-user d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                                    <div class="text-dark">
                                        12345678 William (willredd@gmail.com)
                                    </div>
                                </div>   
                                
                            </div>                                                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
    }

    private renderPage(): string{
        return this.renderHeader() + this.renderAddBookElement() + this.renderAddUserElement() + this.renderBookList() + this.renderUserList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
