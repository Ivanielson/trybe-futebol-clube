import fs = require('fs');
import Jwt = require('jsonwebtoken');
import Users from '../database/models/Users';
import generatorJwt from '../functions/generatorJWT';
import { toUserLogin } from '../functions/helpers';
import { ILoginValid } from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
type VerifyJWT = {
  data: {
    id: number;
    username: string;
    role: string;
    email: string;
    password: string;
  }
};

export default class LoginService {
  static async authentication(email: string): Promise<ILoginValid | undefined> {
    try {
      const user = await Users.findOne({
        where: { email },
      }) as IUser;
      const token = generatorJwt(user);
      const result = toUserLogin(user, token);
      return result as ILoginValid;
    } catch (error) {
      console.error(error);
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await Users.findOne({ where: { email } });
      return user as IUser;
    } catch (error) {
      console.error(error);
    }
  }

  static validateToken(token: string): string {
    const { data } = Jwt.verify(token, SECRET) as VerifyJWT;
    return data.role;
  }
}
