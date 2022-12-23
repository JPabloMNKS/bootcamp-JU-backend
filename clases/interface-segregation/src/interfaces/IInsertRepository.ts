export interface IInsertRepository<T>{
    insert(entity: T): T;
}