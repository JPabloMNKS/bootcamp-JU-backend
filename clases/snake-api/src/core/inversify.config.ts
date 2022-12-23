import { TYPES } from './types';
import { Container } from 'inversify';

import UserRepository from '../infraestructure/repository/userRepository';
import { IUserRepository } from './repository/IUserRepository';
import { IUserService } from './services/interface/IUserService';
import { UserService } from './services/base/userService';

import GamesRepository from '../infraestructure/repository/gamesRepository';
import {GamesService} from './services/base/gamesService';
import { IGamesRepository } from './repository/IGamesRepository';
import { IGamesService } from './services/interface/IGamesService';

import GameRepository from '../infraestructure/repository/gameRepository';
import { IGameRepository } from './repository/IGameRepository';
import { IGameService } from './services/interface/IGameService';
import { GameService } from './services/base/gameService';

import SnakeRepository from '../infraestructure/repository/snakeRepository';
import { SnakeService } from './services/base/snakeService';
import { ISnakeService } from './services/interface/ISnakeService';
import { ISnakeRepository } from './repository/ISnakeRepository';

const myContainer = new Container();

myContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
myContainer.bind<IUserService>(TYPES.IUserService).to(UserService);

myContainer.bind<IGamesRepository>(TYPES.IGamesRepository).to(GamesRepository);
myContainer.bind<IGamesService>(TYPES.IGamesService).to(GamesService);

myContainer.bind<IGameRepository>(TYPES.IGameRepository).to(GameRepository);
myContainer.bind<IGameService>(TYPES.IGameService).to(GameService);

myContainer.bind<ISnakeRepository>(TYPES.ISnakeRepository).to(SnakeRepository);
myContainer.bind<ISnakeService>(TYPES.ISnakeService).to(SnakeService);

export { myContainer };