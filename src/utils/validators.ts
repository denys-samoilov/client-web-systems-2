export class Validator {
    public isValidName(name: string): boolean {
        if (!name) return false;
        name = name.trim();
        return name.length >= 3;
    }

    public isValidEmail(email: string): boolean {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    public isValidYear(year: number): boolean {
        if(!year) return false;
        const currentYear = new Date().getFullYear();
        return !isNaN(year) && year <= currentYear;
    }
}