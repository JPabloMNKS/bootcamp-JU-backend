import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { GamesModel } from './gamesModel';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'snake_db',
  synchronize: true,
  logging: false,
  entities: [GamesModel],
  useUnifiedTopology: true,
  useNewUrlParser:true,
  subscribers: [],
  migrations: [],
});
