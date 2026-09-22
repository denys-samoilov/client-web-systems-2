import { Validator } from '../../utils/validators.ts';

export class UserForm {
  private validator = new Validator();

  public render(): string {
    return `
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-10">
                        
                        <div class="card p-4 shadow-sm border-0 rounded bg-white">
                            <div class="card-body">
                                
                                <h2 class="card-title fw-bold text-dark mb-4">Додати користувача</h2>
                                
                                <form id="add-user-form" novalidate>
                                    
                                    <div class="mb-3">
                                        <input type="text" class="form-control py-2 text-muted" id="user-name" placeholder="Ім'я" required>
                                        <div class="invalid-feedback">Це поле є обов'язковим.</div>

                                    </div>
                                    
                                    <div class="mb-3">
                                        <input type="email" class="form-control py-2 text-muted" id="user-email" placeholder="Email" required>
                                        <div class="invalid-feedback">Введіть коректну адресу електронної пошти.</div>
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

  public validateForm(onSuccess: (name: string, email: string) => void): void {
    const form = document.getElementById('add-user-form') as HTMLFormElement | null;
    const nameInput = document.getElementById('user-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('user-email') as HTMLInputElement | null;

    if (!form || !nameInput || !emailInput) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = this.validator.isValidName(nameInput.value);
      const isEmailValid = this.validator.isValidEmail(emailInput.value);

      nameInput.classList.toggle('is-invalid', !isNameValid);
      emailInput.classList.toggle('is-invalid', !isEmailValid);

      if (isNameValid && isEmailValid) {
        onSuccess(nameInput.value, emailInput.value);

        nameInput.classList.remove('is-invalid');
        emailInput.classList.remove('is-invalid');

        nameInput.value = '';
        emailInput.value = '';
      }
    });
  }
}
