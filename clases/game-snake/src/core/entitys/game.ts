import { Position, GameStatus } from '../types';
import Snake from './snake';
import User from './user';

export default class Game {
    id?: string;
    score: number;
    snake: Snake[];
    board: string;
    boardSize: number;
    foodPosition: Position;
    speed: number;
    gameStatus: GameStatus;
    numberOfPlayers: number;
}
