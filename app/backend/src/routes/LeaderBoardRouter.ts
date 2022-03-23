import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderBoardController.getTeams);

export default leaderboardRouter;
