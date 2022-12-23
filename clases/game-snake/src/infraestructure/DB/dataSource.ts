import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserModel } from './userModel';
import { GamesModel } from './gamesModel';
import { GameModel } from './gameModel';
import { SnakeModel } from './snakeModel';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [UserModel, GamesModel, GameModel, SnakeModel],

});