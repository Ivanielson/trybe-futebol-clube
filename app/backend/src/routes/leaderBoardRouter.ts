import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderBoardController.getLeaderboard);
leaderboardRouter.get('/home', LeaderBoardController.getLeaderboardHome);

export default leaderboardRouter;
