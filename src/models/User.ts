export class User implements IUser{
    private id: number;
    private name: string;
    private email: string;

    constructor(id: number, name: string, email: string)
    {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }
}