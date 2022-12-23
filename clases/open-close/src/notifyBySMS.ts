import  User  from './user';
import { INotify } from './interfaces/INotify';

export class NotifyBySms implements INotify {
    notify(user: User, message: string): void {
        console.log('User: ', user, ' have a message: ', message);
    }
}