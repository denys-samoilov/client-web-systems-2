import type { User } from '../../models/User';

export class UserList {
  public render(users: User[] = []): string {
    let userHtml: string = '';

    for (const user of users) {
      userHtml += `
                <div class="list-group-user d-flex justify-content-between align-items-center py-3 bg-transparent px-0 border-bottom">
                    <div class="text-dark d-flex align-items-center">
                        <button class="btn btn-outline-danger btn-sm border-0 me-2 px-2 py-0 user-delete-btn" data-id="${user.getId()}" title="Видалити користувача">✕</button>
                        <strong>ID: ${user.getId()}</strong>&nbsp;— ${user.getName()} (<span class="text-secondary">${user.getEmail()}</span>)
                    </div>
                </div>   `;
    }

    return `
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-10">
                    
                    <div class="card shadow-sm border-0 rounded bg-white">
                        <div class="card-body p-4">
                            
                            <h2 class="card-title fw-bold text-dark mb-4">Список Користувачів</h2>
                            
                            <div class="list-group list-group-flush"> 
                                ${userHtml}
                            </div>                                                        
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
  }
}
