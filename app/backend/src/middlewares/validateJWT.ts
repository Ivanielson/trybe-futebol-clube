import jwt = require('jsonwebtoken');
import fs = require('fs');
import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import LoginService from '../services/loginService';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

type Verify = {
  data: {
    id: number;
    username: string;
    role: string;
    email: string;
    password: string;
  }
};

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: 'Token not found',
    });
  }
  try {
    const { data } = jwt.verify(token, SECRET) as Verify;
    const user = await LoginService.authentication(data.email);
    if (!user) {
      return res.status(StatusCode.UNAUTHORIZED).json({
        message: 'Invalid token',
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default verifyJWT;
