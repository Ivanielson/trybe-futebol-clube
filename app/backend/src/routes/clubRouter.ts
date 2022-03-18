import { Router } from 'express';
import ClubController from '../controllers/clubController';

const clubsRouter = Router();

clubsRouter.get(
  '/',
  ClubController.getAll,
);

export default clubsRouter;
