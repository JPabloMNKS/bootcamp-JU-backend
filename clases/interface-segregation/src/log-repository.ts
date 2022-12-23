import Log from './event-log';
import { IInsertRepository } from './interfaces/IInsertRepository';


export default class LogRepository implements IInsertRepository<Log>{
    insert(entity: Log): Log {
        console.log('inserting...');
        return new Log();
    }

}