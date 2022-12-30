import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../inversify.config';
import { TYPES, Position } from '../../types';
import { IGamesService } from '../../services/interface/IGamesService';
import Games from '../../entitys/games';
import { GamesModel } from '../../../mongoDBInfraestructure/mongoDB/gamesModel';

dotenv.config();

export default class GamesController {
  static gameService = myContainer.get<IGamesService>(TYPES.IGamesService);
  readonly SCORE: number = 25;


  static getGames = async (request: Request, response: Response) => {
    try {
      const games = await this.gameService.getGames();
      return response.status(200).json(games);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static createGames = async (request: Request, response: Response) => {
    try {
      const { size } = request.body;

      const snake = await this.gameService.createSnake(parseInt(size));
      const foodPosition = await this.gameService.createFood(parseInt(size));
      let snakeBody: Position[] = [];

      const board = await this.gameService.refreshBoard(
        snake,
        size,
        foodPosition,
        snakeBody
      );

      if (!size)
        return response
          .status(406)
          .json({ message: 'Fields must not be empty' });

      const game: Games = {
        score: 0,
        snake: JSON.stringify(snake),
        board: JSON.stringify(board),
        boardSize: parseInt(size),
        gameStatus: 'Ready to Start',
        foodPosition: JSON.stringify(foodPosition),
        snakeBody: JSON.stringify(snakeBody),
      };

      const serviceResponse = await this.gameService.createGame(game);

      response.status(201).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static getGameById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const game = await this.gameService.getGameByID(id);
      if (!game) return res.status(404).json({ message: 'game doesnt exists' });

      return res.status(200).json(game);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  static moveSnake = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const { direction } = request.body;

      let foodPosition: Position;
      let snakeBody: Position[] = [];
      let gameStatus: string = 'Playing';

      const game = await this.gameService.getGameByID(id);
      if (!game)
        return response.status(404).json({ message: 'game doesnt exists' });

      if (gameStatus != 'Playing') {
        return response.status(200).json('Game Ended');
      }
      const movement = this.gameService.moveSnake(
        direction.toString(),
        JSON.parse(game.snake),
        game.boardSize
      );     

      const snakeEatFood = await this.gameService.eatFood(
        movement,
        JSON.parse(game.foodPosition)
      );

      const snakeDieFromCollition =
        this.gameService.snakeDieFromCollidingWithBody(
          movement,
          JSON.parse(game.snakeBody)
        );

      if (snakeDieFromCollition) {
        gameStatus = 'Ended';
      }

      if (snakeEatFood) {
        game.score = game.score + 25;
        snakeBody = await this.gameService.growSnake(movement);
        snakeBody = this.gameService.moveBody(
          snakeBody,
          JSON.parse(game.snake)
        );
        foodPosition = await this.gameService.createFood(game.boardSize);

      } else {
        foodPosition = JSON.parse(game.foodPosition);
        snakeBody = this.gameService.moveBody(
          JSON.parse(game.snakeBody),
          JSON.parse(game.snake)
        );
      }

      const newBoard = this.gameService.refreshBoard(
        movement,
        game.boardSize,
        JSON.parse(game.foodPosition),
        snakeBody
      );
      let newGame: Games = {
        score: game.score,
        snake: JSON.stringify(movement),
        board: JSON.stringify(newBoard),
        gameStatus: gameStatus,
        foodPosition: JSON.stringify(foodPosition),
        snakeBody: JSON.stringify(snakeBody),
        boardSize: 0
      };

      await this.gameService.update(
         id.toString(),
         newGame
      );

      return response.status(200).json(newBoard);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static resetGames = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      let snakeBody: Position[] = [];

      const game = await this.gameService.getGameByID(id);
      if (!game)
        return response.status(404).json({ message: 'game doesnt exists' });

      const size = game.boardSize;

      const snake = await this.gameService.createSnake(size);
      const foodPosition = await this.gameService.createFood(size);

      const board = await this.gameService.refreshBoard(
        snake,
        game.boardSize,
        foodPosition,
        snakeBody
      );

      const newGame: Games = {
        id: game.id,
        score: 0,
        snake: JSON.stringify(snake),
        board: JSON.stringify(board),
        boardSize: size,
        gameStatus: 'Ready to Start',
        foodPosition: JSON.stringify(foodPosition),
        snakeBody: JSON.stringify(snakeBody),
      };

      const serviceResponse = await this.gameService.createGame(newGame);

      return response.status(200).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };
}
