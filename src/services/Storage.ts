// робота з LocalStorage

export class Storage {
    public set(key: string, data: any): void {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error(`Помилка запису в LocalStorage за ключем "${key}":`, error);
        }
    }


    public get<T>(key: string): T | null {
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;
            return JSON.parse(data) as T;
        } catch (error) {
            console.error(`Помилка зчитування з LocalStorage за ключем "${key}":`, error);
            return null;
        }
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }
}
