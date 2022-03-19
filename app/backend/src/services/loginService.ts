import fs = require('fs');
import Jwt = require('jsonwebtoken');
import IUser from '../interfaces/IUser';
import Users from '../database/models/Users';

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
  static async authentication(email: string): Promise<IUser | undefined> {
    try {
      const login = await Users.findOne({
        where: { email },
        raw: true,
      });

      return login as IUser;
    } catch (error) {
      console.error(error);
    }
  }

  static validateToken(token: string): string {
    const { data } = Jwt.verify(token, SECRET) as VerifyJWT;
    return data.role;
  }
}
