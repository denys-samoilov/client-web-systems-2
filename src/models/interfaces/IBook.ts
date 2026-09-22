export interface IBook {
  getName(): string;
  getAuthor(): string;
  getYear(): number;
  getStatus(): string;
  setStatus(status: string): void;
}
