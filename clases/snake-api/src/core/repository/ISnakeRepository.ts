import Snake from '../entitys/snake';

export interface ISnakeRepository {
    create(snake: Snake): Promise<Snake>;
    delete(snakeID: string): Promise<void>;
    getSnakes(): Promise<Snake[]>;
    getSnakeByID(snakeID: string): Promise<Snake>;
    update(snakeID: string, snake: Snake): Promise<void>;
}