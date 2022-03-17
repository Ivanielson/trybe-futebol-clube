import { Request, Response, Router } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginController from '../controllers/loginController';
import validLogin from '../middlewares/loginValidate';

const loginRoute = Router();
const loginController = new LoginController();

loginRoute.post('/', validLogin, async (req: Request, res: Response) => {
  const user = req.body as ILogin;
  const login = await loginController.authentication(user);
  res.status(200).json(login);
});

export default loginRoute;
