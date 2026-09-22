export class Validator {
  public isValidName(name: string): boolean {
    if (!name) return false;
    return true;
  }

  public isValidEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  public isValidYear(year: string): boolean {
    if (!year) return false;
    if (year.length != 4) return false;
    const currentYear = new Date().getFullYear();
    return parseInt(year) <= currentYear;
  }

  public static isValidId(id: string): boolean {
    if (!id) return false;
    const idRegex = /^\d+$/;
    return idRegex.test(id);
  }
}
