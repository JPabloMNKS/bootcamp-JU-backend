import { IGamesService } from '../interface/IGamesService';
import Games from '../../entitys/games';
import { inject, injectable } from 'inversify';
import { TYPES, Position, Direction } from '../../types';
import { IGamesRepository } from '../../repository/IGamesRepository';

@injectable()
export class GamesService implements IGamesService {
  array: number[][] = [];

  snakePosition: Position;
  board: number[][] = [];

  newBoard: number[][] = [];
  emptyBoard: number[][] = [];


  snakeBody: Position[] = [];
  
  

  constructor(
    @inject(TYPES.IGamesRepository)
    private gameRepository: IGamesRepository
  ) {}

  createEmptyBoard(boardSize: number): number[][] {
    this.emptyBoard = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => 0)
    );
    return this.emptyBoard;
  }

  createBoard(n_size: number): number[][] {
    this.array = Array.from({ length: n_size }, () =>
      Array.from({ length: n_size }, () => 0)
    );
    this.emptyBoard = this.array;
    this.createSnake(n_size);
    this.board = this.array;
    return this.array;
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


  createSnake(n_size: number): Position {
    const dateSeeds = new Date();

    let number_one: number = dateSeeds.getMilliseconds();
    let number_two: number = dateSeeds.getSeconds();
    let number_three: number = dateSeeds.getMinutes();
    // this.createBoard(6);
    let axis_x: number = this.randomGenerator(
      n_size,
      number_one,
      number_two,
      number_three
    ).next().value;
    let axis_y: number = this.randomGenerator(
      n_size,
      number_three,
      number_one,
      number_two
    ).next().value;

    let position: Position = {
      x: axis_x,
      y: axis_y,
    };
    // this.snakePosition = position;

    this.snakePosition = {
      x: axis_x,
      y: axis_y
    };
    this.array[axis_x][axis_y] = 1;

    return position;
  }

  createFood(n_size: number): Position {
     return this.createRandomPlace(n_size);
  }

  async createGame(game: Games): Promise<Games> {
    return this.gameRepository.createGame(game);
  }

  changePosition(axis_x: number, axis_y: number){
    return {
      x: axis_x,
      y: axis_y,
    };
  }

  moveSnake(direction: string, position: Position, boardSize: number): Position {
    let limit = boardSize - 1;

    switch(direction){
      case 'Up':
        position = position = this.changePosition(position.x,position.y-1);
        if(position.y < 0){
          position = this.changePosition(position.x,limit);
        }
      break;

      case 'Right':
        position = this.changePosition(position.x+1,position.y);
        if(position.x > limit){
          position = this.changePosition(0,position.y);
        }
      break;

      case 'Down':
        position = this.changePosition(position.x,position.y+1);
        if(position.y > limit){
          position = this.changePosition(position.x,0);
        }
      break;

      case 'Left':
        position = this.changePosition(position.x-1,position.y);
        if(position.x < 0){
          position = this.changePosition(limit,position.y);
        }
      break;



    }

    // if (direction == 'Up') {
    //   // this.changePosition(position,0,-1);
    //   // position = {
    //   //   x: position.x,
    //   //   y: position.y -= 1,
    //   // };
    //   if(position.y < 0){
    //     // position = {
    //     //   x: position.x,
    //     //   y: limit,
    //     // };
    //   }
    // } 

    // else if (direction == 'Right') {
    //   // position = {
    //   //   x: position.x += 1,
    //   //   y: position.y,
    //   // };
    //   if(position.x > limit){
    //     position = {
    //       x: 0,
    //       y: position.y,
    //     };
    //   }
    // } 
    // else if (direction == 'Down') {
    //   position = {
    //     x: position.x,
    //     y: position.y += 1,
    //   };
    //   if(position.y > limit){
    //     position = {
    //       x: position.x,
    //       y: 0,
    //     };
    //   }
    // } 
    // else if (direction == 'Left') {
    //   position = {
    //     x: position.x -= 1,
    //     y: position.y,
    //   };
    //   if(position.x < 0){
    //     position = {
    //       x: limit,
    //       y: position.y,
    //     };
    //   }
    // }

 

    return position;
  }

  refreshBoard(newSnakePosition: Position, boardSize: number, foodPosition: Position){
    this.newBoard = this.createEmptyBoard(boardSize);
    this.newBoard[newSnakePosition.x][newSnakePosition.y] = 1;
    this.newBoard[foodPosition.x][foodPosition.y] = 0.5;

    return this.newBoard;
  }


  eatFood(snakePosition: Position, foodPosition: Position): boolean{
    if(snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y){
      this.snakeBody.push(foodPosition);
      return true;
    }
    return false;
  }

  



  generateBoard(boardSize: number){    
    this.newBoard = this.createEmptyBoard(boardSize);
    this.newBoard[this.snakePosition.x][this.snakePosition.y] = 1;
  }



  getBoard(){
    return this.newBoard;
  }

  getSnake(){
    return this.snakePosition;
  }

  putSnake(snake: Position){
    this.snakePosition = snake;
  }

  getGameByID(gameID: string): Promise<Games> {
    return this.gameRepository.getGameByID(gameID);
  }
  update(gameID: string, game: Games): Promise<void> {
    return this.gameRepository.update(gameID, game);
  }




  async deleteGame(gameID: string): Promise<void> {
    return await this.gameRepository.deleteGame(gameID);
  }
  getUser(): Promise<Games[]> {
    return this.gameRepository.getGames();
  }


  deleteBoard(boardID: string): Promise<void> {
    return null;
  }
  deleteSnake(snakeID: string): Promise<void> {
    return null;
  }
  deleteFood(foodID: string): Promise<void> {
    return null;
  }
}
