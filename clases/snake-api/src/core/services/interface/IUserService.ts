import User from '../../entitys/user';

export interface IUserService {
    create(user: User): Promise <User>;
    delete(userID: string): Promise<void>;
    getUser(): Promise<User[]>;
    getUserById(userID: string ) : Promise<User>;
    update(userID: string, user: User): Promise<void>;
}