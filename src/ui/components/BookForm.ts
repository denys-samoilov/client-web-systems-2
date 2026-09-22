import { Validator } from '../../utils/validators.ts';

export class BookForm {
  private validator = new Validator();

  public render(): string {
    return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-10">
                        
                        <div class="card p-4 shadow-sm border-0 rounded bg-white">
                            <div class="card-body">
                                
                                <h2 class="card-title fw-bold text-dark mb-4">Додати Книгу</h2>
                                
                                <form id="add-book-form" novalidate>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-name" placeholder="Назва книги" required>
                                        <div class="invalid-feedback">Дане поле є обов'язковим.</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-author" placeholder="Автор" required>
                                        <div class="invalid-feedback">Дане поле є обов'язковим.</div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="book-year" placeholder="Рік видання" inputmode="numeric" required>
                                        <div class="invalid-feedback">Введіть коректний рік, не пізніший за поточний.</div>
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

  public validateForm(onSuccess: (name: string, author: string, year: number) => void): void {
    const form = document.getElementById('add-book-form') as HTMLFormElement;
    const nameInput = document.getElementById('book-name') as HTMLInputElement | null;
    const authorInput = document.getElementById('book-author') as HTMLInputElement | null;
    const yearInput = document.getElementById('book-year') as HTMLInputElement | null;

    if (!form || !nameInput || !authorInput || !yearInput) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = this.validator.isValidName(nameInput.value);
      const isAuthorValid = this.validator.isValidName(authorInput.value);
      const isYearValid = this.validator.isValidYear(yearInput.value.trim());

      nameInput.classList.toggle('is-invalid', !isNameValid);
      authorInput.classList.toggle('is-invalid', !isAuthorValid);
      yearInput.classList.toggle('is-invalid', !isYearValid);

      if (isNameValid && isAuthorValid && isYearValid) {
        onSuccess(nameInput.value, authorInput.value, parseInt(yearInput.value, 10));

        nameInput.classList.remove('is-invalid');
        authorInput.classList.remove('is-invalid');
        yearInput.classList.remove('is-invalid');

        nameInput.value = '';
        authorInput.value = '';
        yearInput.value = '';
      }
    });
  }
}
