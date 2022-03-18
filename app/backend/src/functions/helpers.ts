import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';

const toUserLogin = (user: IUser, token: string) => {
  const { id, username, role, email } = user;
  return {
    user: {
      id,
      username,
      role,
      email,
    },
    token,
  };
};

const checkPassword = (hashDb: string, password: string) => {
  const check = bcrypt.compareSync(password, hashDb);
  return check;
};

export { toUserLogin, checkPassword };
