import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { AppDataSource } from '../DB/dataSource';
import { ISnakeRepository } from '../../core/repository/ISnakeRepository';
import Snake from '../../core/entitys/snake';
import { SnakeModel } from '../DB/snakeModel';
import SnakeMapper from '../mapper/snakeMapper';

dotenv.config();

@injectable()
export default class SnakeRepository implements ISnakeRepository {

    private snakeRepository: Repository<Snake>;

    
    constructor() {
        this.snakeRepository = AppDataSource.getRepository(Snake);
    }
    async create(snake: Snake): Promise<Snake> {
        return await this.snakeRepository.save(snake);
    }
    async delete(snakeID: string): Promise<void> {
        await this.snakeRepository.delete(snakeID);
    }
    async getSnakes(): Promise<Snake[]> {
        let snake = await SnakeModel.find();
        return snake.map((snake) => SnakeMapper.toSnake(snake));
    }
    async getSnakeByID(snakeID: string): Promise<Snake> {
        const snake = await this.snakeRepository.findOneBy({ id: snakeID });
        if (!snake) throw new Error('Snake doesnt exists');
        return snake;
    }
    async update(snakeID: string, snake: Snake): Promise<void> {
        const snakeToUpdate = await this.snakeRepository.findOneBy({ id: snakeID });
        if (!snakeToUpdate) throw new Error('Snake doesnt exists');
        await SnakeModel.update(snakeID, SnakeMapper.toSnakeModel(snake));
    }
}
