import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';
import { toUserLogin } from '../functions/helpers';
import generatorJwt from '../functions/generatorJWT';

export default class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const user = req.body as ILogin;
      const userValid = await LoginService.authentication(user.email);
      if (!userValid) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: 'Incorrect email or password',
        });
      }
      const token = generatorJwt(userValid);
      const result = toUserLogin(userValid, token);
      res.status(StatusCode.OK).json(result);
    } catch (error) {
      console.error(error);
    }
  }

  static validateToken(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (token) {
      const role = LoginService.validateToken(token);
      return res.status(StatusCode.OK).json(role);
    }
  }
}
