import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { AppDataSource } from '../DB/dataSource';
import { IGameRepository } from '../../core/repository/IGameRepository';
import Game from '../../core/entitys/game';
import { GameModel } from '../DB/gameModel';
import GameMapper from '../mapper/gameMapper';
dotenv.config();

@injectable()
export default class GameRepository implements IGameRepository {

    private gameRepository: Repository<Game>;

    constructor() {
        this.gameRepository = AppDataSource.getRepository(Game);
    }
    async create(game: Game): Promise<Game> {
        return await this.gameRepository.save(game);
    }
    async delete(gameID: string): Promise<void> {
        await this.gameRepository.delete(gameID);
    }
    async getGames(): Promise<Game[]> {
         

        let game = await GameModel.find();
        return game.map((game) => GameMapper.toGame(game));
        // return await GameModel.find();
    }
    async getGameByID(gameID: string): Promise<Game> {
        const game = await this.gameRepository.findOneBy({ id: gameID });
        if (!game) throw new Error('Game doesnt exists');
        return game;
    }
    async update(gameID: string, game: Game): Promise<void> {
        const gameToUpdate = await this.gameRepository.findOneBy({ id: gameID });
        if (!gameToUpdate) throw new Error('Game doesnt exists');
        await GameModel.update(gameID, GameMapper.toGameModel(game));
    }
}
