import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';
import IUser from '../interfaces/IUser';
import { checkPassword } from '../functions/helpers';

const MESSAGE_ERROR = 'All fields must be filled';
const MESSAGE_ERROR_INCORRECT = 'Incorrect email or password';

const emailExists = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const bodyKeys = Object.keys(body);
  if (!bodyKeys.includes('email')) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR,
    });
  }

  next();
};

const passwordExist = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const bodyKeys = Object.keys(body);
  if (!bodyKeys.includes('password')) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR,
    });
  }

  next();
};

const passwordValid = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password.length <= 6 || typeof password !== 'string') {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR,
    });
  }

  next();
};
const emailValid = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const reg = /\S+@\S+\.\S+/;
  const validate = reg.test(email);
  if (!validate) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR_INCORRECT,
    });
  }

  next();
};

const validUser = async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body as IUser;
  const user = await LoginService.authentication(login.email);
  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR_INCORRECT,
    });
  }
  const check = checkPassword(user.password, login.password);
  if (!check) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR_INCORRECT,
    });
  }

  next();
};

export {
  emailExists,
  passwordExist,
  emailValid,
  passwordValid,
  validUser,
};
