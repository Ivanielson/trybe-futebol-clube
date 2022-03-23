import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import LeaderBoardService from '../services/leaderboardService';

export default class LeaderBoardController {
  static async getTeams(_req: Request, res: Response) {
    try {
      const teams = await LeaderBoardService.getMatchResults();
      return res.status(StatusCode.OK).json(teams);
    } catch (error) {
      console.error(error);
    }
  }
}
