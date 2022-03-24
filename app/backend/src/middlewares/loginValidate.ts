import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';
import StatusCode from '../enums/StatusCode';
import IUser from '../interfaces/IUser';
import { checkPassword } from '../functions/helpers';

const MESSAGE_ERROR = 'All fields must be filled';
const MESSAGE_ERROR_INCORRECT = 'Incorrect email or password';

const validFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: MESSAGE_ERROR,
    });
  }

  next();
};

const validUser = async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body as IUser;
  const user = await LoginService.getUserByEmail(login.email);
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
  validUser,
  validFields,
};
