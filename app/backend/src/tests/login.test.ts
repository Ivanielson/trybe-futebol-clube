import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';
import { ILoginValid } from '../interfaces/ILogin';
import IUser from "../interfaces/IUser";
import LoginService from "../services/loginService";
import { userValid } from './mock/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota login', () => {
  describe('Rota "POST /login"', () => {
    let chaiHttpResponse: Response;
    const payLoad = {
      email: "admin@admin.com",
      password: "secret_admin",
    };
  
    before(async () => {
      Sinon
        .stub(LoginService, 'authentication')
        .resolves(userValid as ILoginValid);
    });
  
    after(() => {
      (LoginService.authentication as Sinon.SinonStub).restore();
    });
  
    it(`Deveria retonar um objeto com as propriedades:
      user, user.id, user.userName, user.role, user.email e token`, async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(payLoad);

      expect(chaiHttpResponse.body).to.be.have.a.property('user');
      expect(chaiHttpResponse.body).to.be.have.a.property('token');
      expect(chaiHttpResponse.body.user).to.be.have.a.property('username');
      expect(chaiHttpResponse.body.user).to.be.have.a.property('role');
      expect(chaiHttpResponse.body.user).to.be.have.a.property('email');
    });

    it('Deveria retornar o status da requisição: 201', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(payLoad);

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
  
  describe('Rota "GET /login/validate"', () => {
    let chaiHttpResponse: Response;
    let chaiHttpLogin: Response;
    const role = "admin";
    const user = {
      email: "admin@admin.com",
      password: "secret_admin",
    }

    before(async () => {
      Sinon
        .stub(LoginService, 'validateToken')
        .resolves(role);

      chaiHttpLogin = await chai
        .request(app)
        .post('/login')
        .send(user);
    });
  
    after(() => {
      (LoginService.validateToken as Sinon.SinonStub).restore();
    });
  
    it('Deveria retornar o role do user ao receber um token válido', async () => {
      const token = chaiHttpLogin.body.token;
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ Authorization: token });

      expect(chaiHttpResponse.body).to.be.equal(role);
    });

    it('Deveria retornar o status da requisição: 200', async () => {
      const token = chaiHttpLogin.body.token;
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set({ Authorization: token });

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});