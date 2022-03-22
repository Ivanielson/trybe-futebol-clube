import { Router } from 'express';
import { areDifferentTeams, teamExist } from '../middlewares/matchValidate';
import MatchContoller from '../controllers/matchController';
import verifyJWT from '../middlewares/validateJWT';

const matchRouter = Router();

matchRouter.get('/', MatchContoller.getAll);
matchRouter.post(
  '/',
  areDifferentTeams,
  teamExist,
  verifyJWT,
  MatchContoller.create,
);
matchRouter.patch('/:id/finish', MatchContoller.finishMatch);

export default matchRouter;
