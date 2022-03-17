import { Request, Response, Router } from 'express';
import LoginController from '../controllers/loginController';
import validLogin from '../middlewares/loginValidate';

const loginRoute = Router();
const loginController = new LoginController();

loginRoute.post('/', validLogin, async (req: Request, res: Response) => {
  const login = await loginController.authentication(req.body);
  res.status(200).json(login);
});

export default loginRoute;
