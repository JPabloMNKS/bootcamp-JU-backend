// import Game from '../../core/entitys/game';
// import { GameModel } from '../DB/gameModel';

// export default class GameMapper {
//   static toGame(gameEntity: GameModel): Game {
//     const game = new Game();
//     game.id = gameEntity.id;
//     game.score = gameEntity.score;
//     game.snake = JSON.parse(gameEntity.snake);
//     game.board = gameEntity.board;
//     game.boardSize = gameEntity.boardSize;
//     game.foodPosition = JSON.parse(gameEntity.foodPosition);
//     game.speed = gameEntity.speed;
//     game.gameStatus = JSON.parse(gameEntity.gameStatus);
//     game.numberOfPlayers = gameEntity.numberOfPlayers; 

//     return game;
//   }

//   static toGameModel(game: Game): GameModel {
//     const gameEntity = new GameModel();
//     gameEntity.id = game.id;

//     gameEntity.score = game.score;
//     gameEntity.snake = JSON.stringify(game.snake);
//     gameEntity.board = game.board;
//     gameEntity.boardSize = game.boardSize;
//     gameEntity.foodPosition = JSON.stringify(game.foodPosition);
//     gameEntity.speed = game.speed;
//     gameEntity.gameStatus = game.gameStatus;
//     gameEntity.numberOfPlayers = game.numberOfPlayers;

//     return gameEntity;
//   }

// }

