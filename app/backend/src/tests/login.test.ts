import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";
import { userLogin } from './mock/models';

import { Response } from 'superagent';

import { app } from '../app';
import loginService from '../services/loginService';
import IUser from "../interfaces/IUser";

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  let chaiHttpResponse: Response;
  const payLoad = {
    username: 'John Lennon',
    email: 'john_lennon@gmail.com'
  }

  before(async () => {
    Sinon
      .stub(loginService, 'authentication')
      .resolves({
        ...userLogin.authentication
      } as IUser);
  });

  after(() => {
    (userLogin.authentication as Sinon.SinonStub).restore();
  });

  it('Se usuário válido retorna true', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(payLoad);
  
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse).to.be.property('user');
  });
});