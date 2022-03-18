import Jwt = require('jsonwebtoken');
import fs = require('fs');
import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';
import toUserLogin from '../functions/toUserLogin';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
const MESSAGE_ERROR_INCORRECT = 'Incorrect email or password';

export default class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const user = req.body as ILogin;
      const userValid = await LoginService.authentication(user);
      if (!userValid) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: MESSAGE_ERROR_INCORRECT,
        });
      }
      const token = Jwt.sign({ data: userValid }, SECRET);
      const result = toUserLogin(userValid, token);
      res.status(StatusCode.OK).json(result);
    } catch (error) {
      console.error(error);
    }
  }
}
