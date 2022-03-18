import { Router } from 'express';
import ClubController from '../controllers/clubController';

const clubsRouter = Router();

clubsRouter.get('/', ClubController.getAll);
clubsRouter.get('/:id', ClubController.getById);

export default clubsRouter;
