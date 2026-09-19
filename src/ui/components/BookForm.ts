export class BookForm {
    public render(): string {
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
}