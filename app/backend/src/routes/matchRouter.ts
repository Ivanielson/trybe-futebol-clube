import { Router } from 'express';
import MatchContoller from '../controllers/matchController';

const matchRouter = Router();

matchRouter.get('/', MatchContoller.getAll);

export default matchRouter;
