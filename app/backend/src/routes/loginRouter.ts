import { Router } from 'express';
import LoginController from '../controllers/loginController';
import * as validate from '../middlewares/loginValidate';

const loginRoute = Router();

loginRoute.post(
  '/',
  validate.emailExists,
  validate.passwordExist,
  validate.emailValid,
  validate.passwordValid,
  LoginController.login,
);

export default loginRoute;
