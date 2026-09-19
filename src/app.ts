// точка входу, збирає все разом

// import all modules here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// etc.

class App {
    constructor() {
        const rootContainer = document.getElementById('app');

        if (rootContainer) {
            rootContainer.innerHTML = this.renderPage();
        }
    }

    private renderHeader(): string {
        return '<h1 class = "text-center mt-5 fw-bold">Система управління бібліотекою</h1>'
    }

    private renderPage(): string{
        return this.renderHeader();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
