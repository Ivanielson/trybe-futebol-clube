import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";
import { User as userMock } from './mock/models';

import { Response } from 'superagent';

import { app } from '../app';
import Users from '../database/models/Users';

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
      .stub(Users, 'findOne')
      .resolves({
        ...userMock.findOne
      } as Users);
  });

  after(() => {
    (Users.findOne as Sinon.SinonStub).restore();
  });

  it('Se usuário válido retorna true', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(payLoad);
  
      expect(chaiHttpResponse.body).to.have.true;
  });
});