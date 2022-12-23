import Game from '../../entitys/game';
import Snake from '../../entitys/snake';
import { Position } from '../../types';

export interface IGameService {
    create(game: Game): Promise <Game>;
    delete(gameID: string): Promise<void>;
    getGames(): Promise<Game[]>;
    getGameById(gameID: string ) : Promise<Game>;
    update(gameID: string, game: Game): Promise<void>;


    moveSnake(direction: string, position: Position): Position;
    createRandomPlace(boardSize: number): Position;
    createEmptyBoard(boardSize: number): number[][];
    generateBoard(snake: Snake): number[][];
}