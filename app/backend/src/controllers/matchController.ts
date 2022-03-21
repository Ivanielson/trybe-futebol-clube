import { Request, Response } from 'express';
import { IMatchNew } from '../interfaces/IMatch';
import StatusCode from '../enums/StatusCode';
import MatchService from '../services/matchService';

export default class MatchContoller {
  static async getAll(_req: Request, res: Response) {
    try {
      const matchs = await MatchService.getAll();
      return res.status(StatusCode.OK).json(matchs);
    } catch (error) {
      console.error(error);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const {
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      } = req.body as IMatchNew;
      const newMatch = await MatchService.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      });
      return res.status(StatusCode.OK).json(newMatch);
    } catch (error) {
      console.error(error);
    }
  }
}
