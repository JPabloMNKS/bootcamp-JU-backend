import User from './user';
import { NotificationCenter } from './notification-center';
import NotifyByEmail from './notifyByEmail';
import { NotifyBySms } from './notifyBySMS';

let user = new User('Juan');


let notificationCenter = new NotificationCenter();
notificationCenter.notifyByEmail(user, 'test');

let notificationEmail = new NotifyByEmail();
notificationEmail.notify(user,'test');

let notificationSms = new NotifyBySms();
notificationSms.notify(user,'test');
