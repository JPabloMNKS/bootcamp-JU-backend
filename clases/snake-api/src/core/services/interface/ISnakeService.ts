import Snake from '../../entitys/snake';

export interface ISnakeService {
    create(snake: Snake): Promise <Snake>;
    delete(snakeID: string): Promise<void>;
    getSnakes(): Promise<Snake[]>;
    getSnakeById(snakeID: string ) : Promise<Snake>;
    update(snakeID: string, snake: Snake): Promise<void>;
}