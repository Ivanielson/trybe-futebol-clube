import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/', LeaderBoardController.getLeaderboard);
leaderboardRouter.get('/home', LeaderBoardController.getLeaderboardHome);
leaderboardRouter.get('/Away', LeaderBoardController.getLeaderboardAway);

export default leaderboardRouter;
