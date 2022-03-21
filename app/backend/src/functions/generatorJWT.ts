import jwt = require('jsonwebtoken');
import fs = require('fs');
import IUser from '../interfaces/IUser';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const generatorJwt = (payload: IUser): string => {
  const configJwt: jwt.SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

  const token = jwt.sign({ data: payload }, SECRET, configJwt);

  return token;
};

export default generatorJwt;
