import IUser from '../interfaces/IUser';
import Users from '../database/models/Users';
// import ILogin from '../interfaces/ILogin';

export default class LoginService {
  static async authentication(email: string): Promise<IUser | undefined> {
    try {
      const login = await Users.findOne({
        where: { email },
      });
      return login as IUser;
    } catch (error) {
      console.error(error);
    }
  }
}
