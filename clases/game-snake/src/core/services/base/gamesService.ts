import { IGamesService } from '../interface/IGamesService';
import Games from '../../entitys/games';
import { inject, injectable } from 'inversify';
import { TYPES, Position } from '../../types';
import { IGamesRepository } from '../../repository/IGamesRepository';

@injectable()
export class GamesService implements IGamesService {
  private readonly SEED_ONE: number = 574;
  private readonly SEED_TWO: number = 385;
  private readonly SEED_THREE: number = 479;

  private readonly BOARD_EMPTY_SPACE: number = 0;

  private readonly TOP_EDGE_OF_TABLE: number = 0;
  private readonly RIGHT_EDGE_OF_TABLE: number = 0;
  private readonly BOTTOM_EDGE_OF_TABLE: number = 0;
  private readonly LEFT_EDGE_OF_TABLE: number = 0;

  private readonly VIPER_MOVEMENT: number = 1;

  private readonly SNAKE_IN_THE_MAP: number = 1;
  private readonly BODY_SNAKE_IN_THE_MAP: number = 2;
  private readonly FOOD_IN_THE_MAP: number = 9;

  private readonly EMPTY_SNAKE_BODY: number = 0;

  private readonly UPWARD_MOVEMENT: string = 'Up';
  private readonly RIGHT_MOVEMENT: string = 'Right';
  private readonly LEFT_MOVEMENT: string = 'Left';
  private readonly DOWN_MOVEMENT: string = 'Down';

  private readonly EDGE_OF_THE_BOARD: number = 1;

  snakeBody: Position[] = [];
  newBoard: number[][] = [];
  emptyBoard: number[][] = [];

  constructor(
    @inject(TYPES.IGamesRepository)
    private gameRepository: IGamesRepository
  ) {}

  createEmptyBoard(sizeOfTheBoard: number): number[][] {
    this.emptyBoard = Array.from({ length: sizeOfTheBoard }, () =>
      Array.from({ length: sizeOfTheBoard }, () => this.BOARD_EMPTY_SPACE)
    );
    return this.emptyBoard;
  }

  randomNumberGenerator = function* (
    sizeOfTheBoard: number,
    multiplier: number,
    increment: number,
    seed: number
  ): Generator<number> {
    while (true) {
      seed = (multiplier * seed + increment) % sizeOfTheBoard;
      yield seed;
    }
  };

  createRandomPlaceInBoard(
    sizeOfTheBoard: number,
    seedOne: number,
    seedTwo: number,
    seedThree: number
  ): Position {
    const timeSeed = new Date();
    const multiplier: number = timeSeed.getMilliseconds() * seedOne;
    const increment: number = timeSeed.getMilliseconds() * seedTwo;
    const seed: number = timeSeed.getMilliseconds() * seedThree;

    const randomPlace = this.randomNumberGenerator(
      sizeOfTheBoard,
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

  createFood(sizeOfTheBoard: number): Position {
    return this.createRandomPlaceInBoard(
      sizeOfTheBoard,
      this.SEED_ONE,
      this.SEED_TWO,
      this.SEED_THREE
    );
  }

  createSnake(sizeOfTheBoard: number): Position {
    return this.createRandomPlaceInBoard(
      sizeOfTheBoard,
      this.SEED_THREE,
      this.SEED_ONE,
      this.SEED_TWO
    );
  }

  async createGame(game: Games): Promise<Games> {
    return this.gameRepository.createGame(game);
  }

  changePosition(
    positionOfTheSnakeInAxisX: number,
    positionOfTheSnakeInAxisY: number
  ) {
    return {
      x: positionOfTheSnakeInAxisX,
      y: positionOfTheSnakeInAxisY,
    };
  }

  moveSnake(
    directionToMoveSnake: string,
    positionOfTheSnake: Position,
    sizeOfTheBoard: number
  ): Position {
    let edgeOfTheBoard = sizeOfTheBoard - this.EDGE_OF_THE_BOARD;

    switch (directionToMoveSnake) {
      case this.UPWARD_MOVEMENT:
        positionOfTheSnake = this.changePosition(
          positionOfTheSnake.x,
          positionOfTheSnake.y - this.VIPER_MOVEMENT
        );
        if (positionOfTheSnake.y < this.TOP_EDGE_OF_TABLE) {
          positionOfTheSnake = this.changePosition(
            positionOfTheSnake.x,
            edgeOfTheBoard
          );
        }
        break;

      case this.RIGHT_MOVEMENT:
        positionOfTheSnake = this.changePosition(
          positionOfTheSnake.x + this.VIPER_MOVEMENT,
          positionOfTheSnake.y
        );
        if (positionOfTheSnake.x > edgeOfTheBoard) {
          positionOfTheSnake = this.changePosition(
            this.RIGHT_EDGE_OF_TABLE,
            positionOfTheSnake.y
          );
        }
        break;

      case this.DOWN_MOVEMENT:
        positionOfTheSnake = this.changePosition(
          positionOfTheSnake.x,
          positionOfTheSnake.y + this.VIPER_MOVEMENT
        );
        if (positionOfTheSnake.y > edgeOfTheBoard) {
          positionOfTheSnake = this.changePosition(
            positionOfTheSnake.x,
            this.BOTTOM_EDGE_OF_TABLE
          );
        }
        break;

      case this.LEFT_MOVEMENT:
        positionOfTheSnake = this.changePosition(
          positionOfTheSnake.x - this.VIPER_MOVEMENT,
          positionOfTheSnake.y
        );
        if (positionOfTheSnake.x < this.LEFT_EDGE_OF_TABLE) {
          positionOfTheSnake = this.changePosition(
            edgeOfTheBoard,
            positionOfTheSnake.y
          );
        }
        break;
    }

    return positionOfTheSnake;
  }

  moveBody(snakeBody: Position[], newPosition: Position): Position[] {
    snakeBody.pop();
    snakeBody.push(newPosition);
    return snakeBody;
  }

  refreshBoard(
    newSnakePosition: Position,
    sizeOfTheBoard: number,
    foodPositionInTheBoard: Position,
    snakeBody: Position[]
  ) {
    this.newBoard = this.createEmptyBoard(sizeOfTheBoard);

    this.newBoard[foodPositionInTheBoard.x][foodPositionInTheBoard.y] =
      this.FOOD_IN_THE_MAP;

    if (snakeBody.length > this.EMPTY_SNAKE_BODY) {
      snakeBody.forEach((snakeBodyPosition) => {
        this.newBoard[snakeBodyPosition.x][snakeBodyPosition.y] =
          this.BODY_SNAKE_IN_THE_MAP;
      });
    }

    this.newBoard[newSnakePosition.x][newSnakePosition.y] =
      this.SNAKE_IN_THE_MAP;

    return this.newBoard;
  }

  eatFood(
    snakePositionInTheBoard: Position,
    foodPositionInTheBoard: Position
  ): boolean {
    if (
      snakePositionInTheBoard.x == foodPositionInTheBoard.x &&
      snakePositionInTheBoard.y == foodPositionInTheBoard.y
    ) {
      this.snakeBody.push(foodPositionInTheBoard);
      return true;
    }
    return false;
  }

  snakeDieFromCollidingWithBody(
    snakePositionInTheBoard: Position,
    snakeBodyPositionInTheBoard: Position[]
  ): boolean {
    snakeBodyPositionInTheBoard.forEach((snakeBody: Position) =>{
      if(snakeBody.x ==  snakePositionInTheBoard.x && 
        snakeBody.y ==  snakePositionInTheBoard.y){
          return true;
        }
    });
    return false;
  }


  growSnake(newPosition: Position): Position[] {
    this.snakeBody.push(newPosition);
    this.snakeBody.pop();
    return this.snakeBody;
  }

  getGameByID(gameID: string): Promise<Games> {
    return this.gameRepository.getGameByID(gameID);
  }

  update(gameID: string, game: Games): Promise<void> {
    return this.gameRepository.update(gameID, game);
  }

  getGames(): Promise<Games[]> {
    return this.gameRepository.getGames();
  }
}
