import { Book } from '../../models/Book.ts';

export class BookList {
  public render(books: Book[] = []): string {
    let booksHtml: string = '';

    for (const book of books) {
      const isBorrowed = book.getStatus() === 'borrowed';

      booksHtml += `
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

    return `
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="card shadow-sm border-0 rounded bg-white">
                            <div class="card-body p-4">
                                
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <h2 class="card-title fw-bold text-dark mb-0">Список Книг</h2>
                                    <div class="w-50">
                                        <input type="text" class="form-control py-2 shadow-none text-muted" id="book-search-input" placeholder="Знайти книгу за назвою: ">
                                    </div>
                                </div>
                                
                                <div class="list-group list-group-flush" id="dynamic-book-list-container">
                                    ${booksHtml || '<div class="text-muted text-center py-3">Нічого не знайдено</div>'}
                                </div>                                                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
