export interface IRepository<T>{
    get(id: number): T;
    delete(id: number): void;
}