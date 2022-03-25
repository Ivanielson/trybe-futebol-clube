import { Request, Response } from 'express';
import { IMatchNew } from '../interfaces/IMatch';
import StatusCode from '../enums/StatusCode';
import MatchService from '../services/matchService';

type MatchUpdate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default class MatchContoller {
  static async getAll(_req: Request, res: Response): Promise<Response | undefined> {
    try {
      const matchs = await MatchService.getAll();
      return res.status(StatusCode.OK).json(matchs);
    } catch (error) {
      console.error(error);
    }
  }

  static async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const match = req.body as IMatchNew;
      const newMatch = await MatchService.create(match);
      return res.status(StatusCode.CREATED).json(newMatch);
    } catch (error) {
      console.error(error);
    }
  }

  static async finishMatch(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      const { inProgress } = req.body;
      const statusValue = inProgress === 'true' ? 1 : 0;
      const finish = await MatchService.finishMatch(Number(id), statusValue);
      return res.status(StatusCode.OK).json(finish);
    } catch (error) {
      console.error(error);
    }
  }

  static async updateMatch(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { id } = req.params;
      const goals = req.body as MatchUpdate;
      const matchUpdate = await MatchService.updateMatch(Number(id), goals);
      return res.status(StatusCode.OK).json(matchUpdate);
    } catch (error) {
      console.error(error);
    }
  }
}
