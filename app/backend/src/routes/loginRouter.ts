import { Router } from 'express';
import LoginController from '../controllers/loginController';
import * as validate from '../middlewares/loginValidate';

const loginRoute = Router();

loginRoute.post(
  '/',
  validate.emailExists,
  validate.emailValid,
  validate.passwordExist,
  validate.passwordValid,
  validate.validUser,
  LoginController.login,
);

loginRoute.get(
  '/validate',
  LoginController.validateToken,
);

export default loginRoute;
