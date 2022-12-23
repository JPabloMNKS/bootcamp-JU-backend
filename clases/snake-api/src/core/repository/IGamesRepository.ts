import Games from '../entitys/games';

export interface IGamesRepository {
    createGame(game: Games): Promise<Games>;
    deleteGame(gameID: string): Promise<void>;
    getGames(): Promise<Games[]>;
    getGameByID(gameID: string): Promise<Games>; 
    update(gameID: string, game: Games): Promise<void> 
    
}
