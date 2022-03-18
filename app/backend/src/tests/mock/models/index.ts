/*
  Para desenvolver essa parte utilizei os exemplos do course no
  seguinte link: https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/testando-apis-com-testes-de-integracao/0e610ada-1418-4fae-9d5a-8232909984f4/conteudo/436dfca2-3d47-438c-9546-a2e087b564d2/utilizando-um-mock-para-o-sequelize/a98ddac5-89db-47a6-afba-482826fe21f3?use_case=side_bar
*/
import Users = require('./Users.json');
import IUser from '../../../interfaces/IUser';
import Jwt = require('jsonwebtoken');
import fs = require('fs');
import { toUserLogin } from '../../../functions/helpers';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

type Login = {
  email: string;
  password: string;
}

class LoginMock {
  constructor(
    private users: IUser[]
  ) {}

  public login (payLoad: Login) {
    const { email, password } = payLoad;
    const userValid = this.users.find((user) => (
      user.password === password && user.email === email
    )) as IUser;
    if (!userValid) {
      const token = Jwt.sign({data: userValid}, SECRET);
      const result = toUserLogin(userValid, token);
      return result;
    }
  }
}

const userMoch = new LoginMock(Users);

const userLogin = {
  authentication: async (payLoad: Login) => userMoch.login(payLoad),
};

// const mockCreate = (Instance, data) => {
//   if(!data){
//     return;
//   }

//   const newData = data;
//   if(!!Instance[0].id) {
//     newData.id = Date.now();
//   }
//   Instance.push(newData);
//   return newData;
// };

// const User = {
//   create: async (data) => mockCreate(Users, data),
//   findAll: async () => Users,
//   findOne: async ({email, password}) => mockLogin({email, password}),
// };

export {
  userLogin,
};