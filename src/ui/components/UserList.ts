export class UserList{
    public render(): string{
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
}