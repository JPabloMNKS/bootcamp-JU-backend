import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../inversify.config';
import { TYPES, Position } from '../../types';
import { IGamesService } from '../../services/interface/IGamesService';
import Games from '../../entitys/games';
import { GamesModel } from '../../../infraestructure/DB/gamesModel';

dotenv.config();

export default class GamesController {
  static gameService = myContainer.get<IGamesService>(TYPES.IGamesService);

  static getGames = async (request: Request, response: Response) => {
    try {
      const games = await this.gameService.getUser();
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
      const board = await this.gameService.createBoard(parseInt(size));
      const snake = await this.gameService.createSnake(parseInt(size));

      const foodPosition = await this.gameService.createFood(parseInt(size));

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
        foodPosition: JSON.stringify(foodPosition)
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

  static updateGame = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const game = await this.gameService.getGameByID(id);
      if (!game)
        return response.status(404).json({ message: 'game doesnt exists' });

      await GamesModel.update(
        { id: id.toString() },
        {
          score: 100,
        }
      );
      response.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static moveSnake = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const {direction} = request.body;
      

      const game = await this.gameService.getGameByID(id);
      if (!game)
        return response.status(404).json({ message: 'game doesnt exists' });

        
      const movement = this.gameService.moveSnake(direction.toString(), JSON.parse(game.snake), game.boardSize);
      console.log(movement);
      
      const newBoard = this.gameService.refreshBoard(movement, game.boardSize, JSON.parse(game.foodPosition));

      
      
      const eated = await this.gameService.eatFood(JSON.parse(game.snake), JSON.parse(game.foodPosition) );

      let foodPosition: Position;
      if(eated){
        foodPosition = await this.gameService.createFood(game.boardSize);
        console.log(foodPosition);
        
      }else{
        foodPosition = JSON.parse(game.foodPosition);
        // console.log(foodPosition);

      }

      
      await GamesModel.update(
        { id: id.toString() },
        {
          score: 100,
          snake: JSON.stringify(movement),
          board: JSON.stringify(newBoard),
          gameStatus: 'Playing',
          foodPosition: JSON.stringify(foodPosition)
        }
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
      const game = await this.gameService.getGameByID(id);
      if (!game) return response.status(404).json({ message: 'game doesnt exists' });

      const size = game.boardSize;

      const board = await this.gameService.createBoard(size);
      const snake = await this.gameService.createSnake(size);
      const foodPosition = await this.gameService.createFood(size);

      const newGame: Games = {
        id: game.id,
        score: 0,
        snake: JSON.stringify(snake),
        board: JSON.stringify(board),
        boardSize: size,
        gameStatus: 'Ready to Start',
        foodPosition: JSON.stringify(foodPosition)
      };

      const serviceResponse = await this.gameService.createGame(newGame);


      return response.status(200).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };



  // static deleteGame = async (request: Request, response: Response) => {
  //   try {
  //     const { id } = request.params;
  //     const user = await this.gameService.getUserByID(id);

  //     if (!user)
  //       return response.status(404).json({ message: 'user doesnt exists' });

  //     await this.userService.delete(id);
  //     response.sendStatus(204);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       response.status(500).json({ message: error.message });
  //     }
  //   }
  // };
}
