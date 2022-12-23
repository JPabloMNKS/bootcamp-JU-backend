import Games from '../../entitys/games';
import { Direction, Position } from '../../types';

export interface IGamesService {
  createEmptyBoard(sizeOfTheBoard: number): number[][];
  randomNumberGenerator(
    sizeOfTheBoard: number,
    multiplier: number,
    increment: number,
    seed: number
  ): Generator<number>;
  createRandomPlaceInBoard(
    sizeOfTheBoard: number,
    seedOne: number,
    seedTwo: number,
    seedThree: number
  ): Position;
  createFood(sizeOfTheBoard: number): Position;
  createSnake(sizeOfTheBoard: number): Position;
  createGame(game: Games): Promise<Games>;
  changePosition(
    positionOfTheSnakeInAxisX: number,
    positionOfTheSnakeInAxisY: number
  ): Position;
  moveSnake(
    directionOfTheSnake: string,
    positionOfTheSnake: Position,
    sizeOfTheBoard: number
  ): Position;
  refreshBoard(
    newSnakePosition: Position,
    sizeOfTheBoard: number,
    foodPositionInTheBoard: Position,
    snakeBody: Position[]
  ): number[][];
  eatFood(
    snakePositionInTheBoard: Position,
    foodPositionInTheBoard: Position
  ): boolean;
  growSnake(newPosition: Position): Position[];
  getGameByID(gameID: string): Promise<Games>;
  update(gameID: string, game: Games): Promise<void>;
  getGames(): Promise<Games[]>;

  moveBody(snakeBody: Position[], newPosition: Position): Position[];
  snakeDieFromCollidingWithBody(
    snakePositionInTheBoard: Position,
    snakeBodyPositionInTheBoard: Position[]
  ): boolean;
}
