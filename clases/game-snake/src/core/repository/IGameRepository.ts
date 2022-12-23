import Game from '../entitys/game';

export interface IGameRepository {
    create(game: Game): Promise<Game>;
    delete(gameID: string): Promise<void>;
    getGames(): Promise<Game[]>;
    getGameByID(gameID: string): Promise<Game>;
    update(gameID: string, game: Game): Promise<void>;

}
