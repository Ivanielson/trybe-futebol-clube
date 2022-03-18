import { Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import ClubesService from '../services/clubServices';

export default class ClubController {
  static async getAll(_req: Request, res: Response) {
    try {
      const allClubes = await ClubesService.getAll();
      return res.status(StatusCode.OK).json(allClubes);
    } catch (error) {
      console.error(error);
    }
  }
}
