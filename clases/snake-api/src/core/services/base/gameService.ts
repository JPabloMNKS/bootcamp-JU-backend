import { inject, injectable } from 'inversify';
import Game from '../../entitys/game';
import { IGameRepository } from '../../repository/IGameRepository';
import { Position, TYPES } from '../../types';
import { IGameService } from '../interface/IGameService';
import Snake from '../../entitys/snake';

@injectable()
export class GameService implements IGameService {
  constructor(
    @inject(TYPES.IGameRepository)
    private gameRepository: IGameRepository
  ) {}

  create(game: Game): Promise<Game> {
    return this.gameRepository.create(game);
  }
  async delete(gameID: string): Promise<void> {
    return await this.gameRepository.delete(gameID);
  }
  getGames(): Promise<Game[]> {
    return this.gameRepository.getGames();
  }
  getGameById(gameID: string): Promise<Game> {
    return this.gameRepository.getGameByID(gameID);
  }
  update(gameID: string, game: Game): Promise<void> {
    return this.gameRepository.update(gameID, game);
  }

  emptyBoard: number[][] = [];
  board: number[][] = [];

  createEmptyBoard(boardSize: number): number[][] {
    this.emptyBoard = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => 0)
    );
    return this.emptyBoard;
  }

  randomGenerator = function* (
    size: number,
    multiplier: number,
    increment: number,
    seed: number
  ): Generator<number> {
    while (true) {
      seed = (multiplier * seed + increment) % size;
      yield seed;
    }
  };

  createRandomPlace(boardSize: number): Position {
    const timeSeed = new Date();
    const multiplier: number = timeSeed.getMilliseconds();
    const increment: number = timeSeed.getMilliseconds() * 2;
    const seed: number = timeSeed.getMilliseconds() * 5;

    const randomPlace = this.randomGenerator(
      boardSize,
      multiplier,
      increment,
      seed
    );

    const axis_x: number = randomPlace.next().value;
    const axis_y: number = randomPlace.next().value;

    const randomPosition: Position = {
      x: axis_x,
      y: axis_y,
    };

    return randomPosition;
  }

  moveSnake(direction: string, position: Position): Position {
    if (direction == 'Up') {
      position = {
        x: position.x,
        y: position.y++,
      };
    } else if (direction == 'Right') {
      position = {
        x: position.x++,
        y: position.y,
      };
    } else if (direction == 'Down') {
      position = {
        x: position.x,
        y: position.y--,
      };
    } else if (direction == 'Left') {
      position = {
        x: position.x--,
        y: position.y,
      };
    }
    return position;
  }

  generateBoard(snake: Snake): number[][] {
    this.board = this.emptyBoard;
    this.board[snake.head.x][snake.head.y] = 1;

    return this.board;
    //   this.board[this.snakePosition.x][this.snakePosition.y] = 1;
  }

  createGame(boardSize: number) {
    this.board = this.createEmptyBoard(boardSize);
  }
}
