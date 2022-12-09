import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CustomerModel } from './customerModel';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [CustomerModel],

});