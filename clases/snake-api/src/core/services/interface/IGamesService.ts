import Games from '../../entitys/games';
import { Direction, Position } from '../../types';

export interface IGamesService {
  createGame(game: Games): Promise<Games>;
  deleteGame(gameID: string): Promise<void>;
  getUser(): Promise<Games[]>;

  createBoard(n_size: number): number[][];
  createSnake(n_size: number): Position;

  deleteBoard(boardID: string): Promise<void>;
  deleteSnake(snakeID: string): Promise<void>;
  deleteFood(foodID: string): Promise<void>;

  moveSnake(direction: string, position: Position, boardSize: number): Position;
  getGameByID(gameID: string): Promise<Games>;
  update(gameID: string, game: Games): Promise<void>;
  getBoard(): void;


  refreshBoard(newSnakePosition: Position, boardSize: number, foodPosition: Position): number[][]; 
  createRandomPlace(boardSize: number): Position;
  createFood(n_size: number): Position;
  eatFood(snakePosition: Position, foodPosition: Position): boolean;

}
