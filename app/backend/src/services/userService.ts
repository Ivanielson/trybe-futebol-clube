import Users from '../database/models/Users';
import ILogin from '../interfaces/ILogin';

export default class UserService {
  private userModel = Users;

  async authentication(user: ILogin) {
    const login = await this.userModel.findOne({
      where: { ...user },
      attributes: ['id', 'username', 'role', 'email'],
    });
    return login;
  }
}
