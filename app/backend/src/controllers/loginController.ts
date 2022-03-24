import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';

export default class LoginController {
  static async authentication(req: Request, res: Response) {
    try {
      const user = req.body as ILogin;
      const userValid = await LoginService.authentication(user.email);
      // if (!userValid) {
      //   return res.status(StatusCode.UNAUTHORIZED).json({
      //     message: 'Incorrect email or password',
      //   });
      // }
      res.status(StatusCode.OK).json(userValid);
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
