export class Modal{
    public renderBorrowModal(): string {
        return `
            <div class="modal fade" id="borrowModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow rounded p-2">
                        
                        <div class="modal-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
                            <h5 class="modal-title fw-bold text-dark fs-5">Введіть ID користувача для позичення книги:</h5>
                            <button type="button" class="btn-close ms-auto shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div class="modal-body py-4">
                            <form id="modal-borrow-form" novalidate>
                                <input type="text" class="form-control py-2 text-muted shadow-none" id="modal-user-id" placeholder="ID">
                                <div class="invalid-feedback" id="modal-id-feedback">Це поле є обов'язковим (тільки цифри).</div>
                            </form>
                        </div>
                        
                        <div class="modal-footer border-top-0 pt-0 d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary px-4 py-2 text-white border-0 shadow-none" style="background-color: #6c757d;" data-bs-dismiss="modal">
                                Скасувати
                            </button>
                            <button type="button" class="btn btn-primary px-4 py-2 text-white border-0 shadow-none" style="background-color: #0d6efd;" id="modal-submit-btn">
                                Зберегти
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
    }
}