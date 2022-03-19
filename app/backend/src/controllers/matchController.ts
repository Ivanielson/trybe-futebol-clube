import { Request, Response } from 'express';
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
}