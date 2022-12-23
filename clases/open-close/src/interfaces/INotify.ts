import User from '../user';

export interface INotify{
    notify(user: User, message: string): void;
}