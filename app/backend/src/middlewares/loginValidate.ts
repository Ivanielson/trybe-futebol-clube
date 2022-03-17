// import { Request, Response, NextFunction } from 'express';
// import StatusCode from '../enums/StatusCode';

// const emailExists = (req: Request, res: Response, next: NextFunction) => {
//   const { body } = req;
//   const bodyKeys = Object.keys(body);
//   if (!bodyKeys.includes('email')) {
//     return res.status(StatusCode.BAD_REQUEST).json();
//   }

//   next();
// };

// export default emailExists;

import { NextFunction, Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import StatusCode from '../enums/StatusCode';
import schemaLogin from './schemas';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const theater = req.body as ILogin;
  const validate = schemaLogin.validate(theater);
  if (validate.error) {
    const { message } = validate.error.details[0];
    const code = message
      .includes('is required') ? StatusCode.BAD_REQUEST : StatusCode.UNPROCESSABLE_ENTITY;
    return res.status(code).json({ message });
  }
  next();
};

export default validLogin;
