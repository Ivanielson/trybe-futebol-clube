import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderBoardController {
  static async getLeaderboard(_req: Request, res: Response) {
    try {
      const teams = await LeaderBoardService.getLeaderboard();
      return res.status(StatusCode.OK).json(teams);
    } catch (error) {
      console.error(error);
    }
  }

  static async getLeaderboardHome(_req: Request, res: Response) {
    try {
      const result = await LeaderBoardService.getLeaderboardHome();
      return res.status(StatusCode.OK).json(result);
    } catch (error) {
      console.error(error);
    }
  }

  static async getLeaderboardAway(_req: Request, res: Response) {
    try {
      const result = await LeaderBoardService.getLeaderboardAway();
      return res.status(StatusCode.OK).json(result);
    } catch (error) {
      console.error(error);
    }
  }
}
