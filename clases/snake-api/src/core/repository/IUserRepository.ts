import User from '../entitys/user';

export interface IUserRepository {
    create(user: User): Promise<User>;
    delete(userID: string): Promise<void>;
    getUsers(): Promise<User[]>;
    getUserByID(userID: string): Promise<User>;
    update(userID: string, user: User): Promise<void>;

}