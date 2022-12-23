import { Router } from 'express';
import UserController from './controllers/userController';
import GameController from './controllers/gameController';
import GamesController from './controllers/gamesController';



const router = Router();
router.post('/users', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById );
router.put('/user/:id', UserController.updateUser );

router.post('/games', GamesController.createGames);
router.get('/games', GamesController.getGames);

router.post('/games/:id', GamesController.moveSnake);
router.get('/games/:id', GamesController.getGameById);

router.post('/games/reset/:id', GamesController.resetGames);






router.post('/game', GameController.createGame);
router.delete('/game/:id', GameController.deleteGame);
router.get('/game', GameController.getGames);
router.get('/game/:id', GameController.getGameById );
router.put('/game/:id', GameController.updateGame );


router.post('/game/:snakeID', GameController.moveSnake);




export default router;