// import { inject, injectable } from 'inversify';
// import Snake from '../../entitys/snake';
// import { ISnakeRepository } from '../../repository/ISnakeRepository';
// import { TYPES } from '../../types';
// import { ISnakeService } from '../interface/ISnakeService';

// @injectable()
// export class SnakeService implements ISnakeService {
//   constructor(
//     @inject(TYPES.ISnakeRepository)
//     private snakeRepository: ISnakeRepository
//   ) {}

//   create(snake: Snake): Promise<Snake> {
//     return this.snakeRepository.create(snake);
//   }
//   async delete(snakeID: string): Promise<void> {
//     return await this.snakeRepository.delete(snakeID);
//   }
//   getSnakes(): Promise<Snake[]> {
//     return this.snakeRepository.getSnakes();
//   }
//   getSnakeById(snakeID: string): Promise<Snake> {
//     return this.snakeRepository.getSnakeByID(snakeID);
//   }
//   update(snakeID: string, snake: Snake): Promise<void> {
//     return this.snakeRepository.update(snakeID, snake);
//   }

// }
