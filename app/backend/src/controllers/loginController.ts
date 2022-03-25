import { Request, Response } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';

export default class LoginController {
  static async authentication(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const user = req.body as ILogin;
      const userValid = await LoginService.authentication(user.email);

      return res.status(StatusCode.OK).json(userValid);
    } catch (error) {
      console.error(error);
    }
  }

  static validateToken(req: Request, res: Response): Response | undefined {
    const token: string | undefined = req.headers.authorization;
    if (token) {
      const role = LoginService.validateToken(token);
      return res.status(StatusCode.OK).json(role);
    }
  }
}
