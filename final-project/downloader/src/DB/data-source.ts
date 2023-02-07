import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UriDownload } from './entity/uriDownload';


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [UriDownload],

});