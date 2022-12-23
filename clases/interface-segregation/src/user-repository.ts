import { IInsertRepository } from './interfaces/IInsertRepository';
import { IRepository } from './interfaces/IRepository';
import User from './user';
import { IUpdateRepository } from './interfaces/IUpdateRepository';
import { IGetRepository } from './interfaces/IGetRepository';
import { IDeleteRepository } from './interfaces/IDeleteRepository';


export default class UserRepository implements IInsertRepository<User>, IUpdateRepository<User>, IGetRepository<User>, IDeleteRepository{

    insert(user: User): User {
        console.log('inserting...');
        return new User();
    }
    update(id: number, user: User): User {
        console.log('updating...');
        return new User();
    }
    get(id: number): User {
        console.log('getting...');
        return new User();
    }
    delete(id: number): void {
        console.log('deleting...');
    }

}