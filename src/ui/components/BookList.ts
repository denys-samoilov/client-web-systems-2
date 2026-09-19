export class BookList {
    public render(): string {
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
}