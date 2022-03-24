import { Router } from 'express';
import LoginController from '../controllers/loginController';
import * as validate from '../middlewares/loginValidate';

const loginRoute = Router();

loginRoute.post(
  '/',
  validate.validFields,
  validate.validUser,
  LoginController.authentication,
);

loginRoute.get(
  '/validate',
  LoginController.validateToken,
);

export default loginRoute;
