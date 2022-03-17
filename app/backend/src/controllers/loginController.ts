import Jwt = require('jsonwebtoken');
import fs = require('fs');
import ILogin from '../interfaces/ILogin';
import UserService from '../services/userService';

export default class LoginController {
  private userService = new UserService();

  async authentication(user: ILogin) {
    const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');
    const login = await this.userService.authentication(user);

    if (!login) {
      return { message: 'Incorrect email or password' };
    }
    const token = Jwt.sign({ data: login }, secret);

    return {
      user: {
        id: login?.id,
        username: login?.username,
        role: login?.role,
        email: login?.email,
      },
      token,
    };
  }
}
