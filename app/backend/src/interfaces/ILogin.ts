interface ILogin {
  email: string;
  password: string;
}

interface ILoginValid {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string,
}

export {
  ILogin,
  ILoginValid,
};
