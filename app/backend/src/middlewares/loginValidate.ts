import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';

const MESSAGE_ERROR = 'All fields must be filled';

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
      message: MESSAGE_ERROR,
    });
  }

  next();
};

export {
  emailExists,
  passwordExist,
  emailValid,
  passwordValid,
};
