import { NextFunction, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import ClubesService from '../services/clubServices';

const teamExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;

    const teamHome = await ClubesService.getById(homeTeam);
    const teamAway = await ClubesService.getById(awayTeam);
    if (!teamHome || !teamAway) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: 'There is no team with such id!',
      });
    }

    next();
  } catch (error) {
    console.error(error);
  }
};

const areDifferentTeams = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  console.log(homeTeam, awayTeam);
  if (homeTeam === awayTeam) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  next();
};

export {
  teamExist,
  areDifferentTeams,
};
