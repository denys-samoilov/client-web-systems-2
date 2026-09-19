export class UserForm {
    public render(): string {
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
}