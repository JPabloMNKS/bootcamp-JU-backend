import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../inversify.config';
import { TYPES } from '../../types';
import { GameModel } from '../../../infraestructure/DB/gameModel';
import { IGameService } from '../../services/interface/IGameService';
import { ISnakeService } from '../../services/interface/ISnakeService';
import { SnakeModel } from '../../../infraestructure/DB/snakeModel';
import Game from '../../entitys/game';
import Snake from '../../entitys/snake';

dotenv.config();

export default class GameController {
  static gameService = myContainer.get<IGameService>(TYPES.IGameService);
  static snakeService = myContainer.get<ISnakeService>(TYPES.ISnakeService);

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

  static getGameById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const game = await this.gameService.getGameById(id);
      if (!game) return res.status(404).json({ message: 'Game doesnt exists' });

      return res.status(200).json(game);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  };

  static createGame = async (request: Request, response: Response) => {
    try {
      const { size } = request.body;
      
      await this.gameService.createEmptyBoard(size);

      const snakePosition = await this.gameService.createRandomPlace(size);
      const foodPosition = await this.gameService.createRandomPlace(size);

      const snake: Snake[] = [{
        direction: 'Right',
        head: snakePosition,
        tail: [],
        size: 1,
      }];

      const board = await this.gameService.generateBoard(snake[0]);


      // const board = await this.gameService.createBoard(parseInt(size));
      // const snake = await this.gameService.createSnake(parseInt(size));


      if (!size)
        return response
          .status(406)
          .json({ message: 'Fields must not be empty' });

      const game: Game = {
        score: 0,
        snake: snake,
        board: JSON.stringify(board),
        boardSize: size,
        foodPosition: foodPosition,
        speed: 1,
        gameStatus: 'Ready to Start',
        numberOfPlayers: 1

      };

      console.log('1');
      

       const serviceResponse = await this.gameService.create(game);
console.log('2');

       response.status(201).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static updateGame = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const game = await this.gameService.getGameById(id);
      if (!game)
        return response.status(404).json({ message: 'Game doesnt exists' });

      await GameModel.update(
        { id: id.toString() },
        {
          //   fullName: request.body.fullName,
          //   address: request.body.address,
          //   gender: request.body.gender,
          //   age: request.body.age,
        }
      );

      response.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static deleteGame = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const game = await this.gameService.getGameById(id);

      if (!game)
        return response.status(404).json({ message: 'Game doesnt exists' });

      await this.gameService.delete(id);
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static moveSnake = async (request: Request, response: Response) => {
    try {
      const { snakeID } = request.params;
      const { direction } = request.body;

      const snake = await this.snakeService.getSnakeById(snakeID);
      if (!snake)
        return response.status(404).json({ message: 'Snake doesnt exists' });

      const movedSnakeHeadPosition = this.gameService.moveSnake(direction, snake.head);


      await SnakeModel.update(
        { id: snakeID.toString() },
        {
          // head: movedSnakeHeadPosition
        }
      );

      return response.status(200).json(snake);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };
}
