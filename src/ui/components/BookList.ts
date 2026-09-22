import { Book } from '../../models/Book.ts';

export class BookList {
  public renderBooks(books: Book[] = []): string {
    let html = '';
    for (const book of books) {
      const isBorrowed = book.getStatus() === 'borrowed';
      html += `
                <div class="list-group-item d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                    <div class="text-dark d-flex align-items-center">
                        <button class="btn btn-outline-danger btn-sm border-0 me-2 px-2 py-0 book-delete-btn ${isBorrowed ? 'd-none' : ''} " data-id="${book.getId()}" title="Видалити книгу">✕</button>
                        <strong>${book.getName()}</strong>&nbsp;by ${book.getAuthor()} (${book.getYear()})
                    </div>
                    
                    <button class="btn ${isBorrowed ? 'btn-warning' : 'btn-primary'} px-3 py-1 btn-sm fw-medium book-action-btn" data-id="${book.getId()}">
                        ${isBorrowed ? 'Повернути' : 'Позичити'}
                    </button>
                </div>
            `;
    }
    return html;
  }

  public paginator(totalBooksCount: number, currentPage: number, pageSize: number = 5): string {
    const totalPages = Math.ceil(totalBooksCount / pageSize) || 1;

    let paginationItemsHtml = '';
    for (let i = 1; i <= totalPages; i++) {
      paginationItemsHtml += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <button class="page-link shadow-none book-page-btn" data-page="${i}">${i}</button>
        </li>
      `;
    }
    return paginationItemsHtml;
  }

  public render(
    books: Book[] = [],
    totalBooksCount: number = 0,
    currentPage: number = 1,
    pageSize: number = 5
  ): string {
    const totalPages = Math.ceil(totalBooksCount / pageSize) || 1;

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
                                    ${this.renderBooks(books) || '<div class="text-muted text-center py-4">У бібліотеці поки немає книг або нічого не знайдено</div>'}
                                </div>

                                <nav class="d-flex justify-content-center mt-4">
                                  <ul class="pagination pagination-sm mb-0">
                                    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                                      <button class="page-link shadow-none book-page-btn" data-page="${currentPage - 1}">Назад</button>
                                    </li>
                                    ${this.paginator(totalBooksCount, currentPage, pageSize)}
                                    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                                      <button class="page-link shadow-none book-page-btn" data-page="${currentPage + 1}">Вперед</button>
                                    </li>
                                  </ul>
                                </nav>
                                                                                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}
