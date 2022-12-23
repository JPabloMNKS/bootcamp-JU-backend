import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { AppDataSource } from '../DB/dataSource';
import { IGamesRepository } from '../../core/repository/IGamesRepository';
import Games from '../../core/entitys/games';
import { GamesModel } from '../DB/gamesModel';
dotenv.config();

@injectable()
export default class GamesRepository implements IGamesRepository {
  private gameRepository: Repository<Games>;

  constructor() {
    this.gameRepository = AppDataSource.getRepository(GamesModel);
  }
  async deleteGame(gameID: string): Promise<void> {
    await this.gameRepository.delete(gameID);
  }
  async getGames(): Promise<Games[]> {
    return await GamesModel.find();
  }
  async createGame(game: Games): Promise<Games> {
    return await this.gameRepository.save(game);
  }

  async getGameByID(gameID: string): Promise<Games> {
    const game = await this.gameRepository.findOneBy({ id: gameID });
    if (!game) throw new Error('Game doesnt exists');
    return game;
  }
  async update(gameID: string, game: Games): Promise<void> {
    const gameToUpdate = await this.gameRepository.findOneBy({ id: gameID });
    if (!gameToUpdate) throw new Error('Game doesnt exists');
    await GamesModel.update(gameID, game);
  }
}
