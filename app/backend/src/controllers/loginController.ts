import Jwt = require('jsonwebtoken');
import fs = require('fs');
import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';
import { toUserLogin } from '../functions/helpers';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

export default class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const user = req.body as ILogin;
      const userValid = await LoginService.authentication(user.email);
      if (userValid) {
        const token = Jwt.sign({ data: userValid }, SECRET);
        const result = toUserLogin(userValid, token);
        res.status(StatusCode.OK).json(result);
      }
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
