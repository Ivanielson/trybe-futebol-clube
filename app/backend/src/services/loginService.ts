import IUser from '../interfaces/IUser';
import Users from '../database/models/Users';
import ILogin from '../interfaces/ILogin';

export default class LoginService {
  static async authentication(user: ILogin) {
    try {
      const login = await Users.findOne({
        where: { ...user },
        attributes: ['id', 'username', 'role', 'email'],
      });
      return login as IUser;
    } catch (error) {
      console.error(error);
    }
  }
}
