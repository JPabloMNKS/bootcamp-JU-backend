export interface IUpdateRepository<T>{
    update(id: number, entity: T): T;
}