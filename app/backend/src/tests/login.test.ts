import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';
import LoginService from "../services/loginService";
import IUser from "../interfaces/IUser";
import loginUser = require('./mock/user.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota "POST /login"', () => {
  let chaiHttpResponse: Response;
  const payload = {
    email: 'admin@admin.com',
    password: 'secret_admin'
  };

  before(async () => {
    Sinon
      .stub(LoginService, 'authentication')
      .resolves(loginUser[0] as IUser);
  });

  after(() => {
    (LoginService.authentication as Sinon.SinonStub).restore();
  });

  it('Se usuário válido retorna um object', async () => {
    chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(payload);

    expect(chaiHttpResponse.body).to.be.have.a('object');
    expect(chaiHttpResponse.body).to.be.have.a.property('id');
    expect(chaiHttpResponse.body).to.be.have.a.property('username');
    expect(chaiHttpResponse.body).to.be.have.a.property('role');
    expect(chaiHttpResponse.body).to.be.have.a.property('email');
    expect(chaiHttpResponse.body).to.be.have.a.property('password');
  });
});

describe('Rota "GET /login/validate"', () => {
  let chaiHttpResponse: Response;
  const role = "admin";
  const payload = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NDc5NTYxODksImV4cCI6MTY0ODA0MjU4OX0.TAtm1AZuXfkRysg0O2cjimR_pKYwUa9_n1FvWlbAyNg',
  };

  before(async () => {
    Sinon
      .stub(LoginService, 'validateToken')
      .resolves(role);
  });

  after(() => {
    (LoginService.validateToken as Sinon.SinonStub).restore();
  });

  it('Recebe um token válido', async () => {
    chaiHttpResponse = await chai
         .request(app)
         .get('/login/validate')
         .send(payload);
    expect(chaiHttpResponse.body).to.be.equal(role);
  });
});