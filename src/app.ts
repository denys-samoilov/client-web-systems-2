// точка входу, збирає все разом

// import all modules here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { PageRenderer } from './ui/render.ts';

class App {
    private renderer = new PageRenderer();

    constructor() {
        const rootContainer = document.getElementById('app');

        if (rootContainer) {
            rootContainer.innerHTML = this.renderer.renderPage();
        }
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
