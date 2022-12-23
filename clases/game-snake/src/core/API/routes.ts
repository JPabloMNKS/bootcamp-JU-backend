import { Router } from 'express';
import GamesController from './controllers/gamesController';

const router = Router();

router.get('/games', GamesController.getGames);
router.post('/games', GamesController.createGames);
router.post('/games/:id', GamesController.moveSnake);
router.get('/games/:id', GamesController.getGameById);
router.post('/games/reset/:id', GamesController.resetGames);

export default router;
