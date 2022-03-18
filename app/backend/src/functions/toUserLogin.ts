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

export default toUserLogin;
