import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';
import IClub from "../interfaces/IClub";
import ClubesService from "../services/clubServices";
import { clubs } from './mock/club';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota clubs', () => {
  describe('Requisição para rota "GET /clubs"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon
        .stub(ClubesService, 'getAll')
        .resolves(clubs as unknown as IClub[]);
    });

    after(() => {
      (ClubesService.getAll as Sinon.SinonStub).restore();
    });

    it('deveria retornar um array de clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

      expect(chaiHttpResponse.body).to.be.have.a('array');
      expect(chaiHttpResponse.body).to.be.have.length(7);
    });

    it('Deveria retonar um array de objetos com as propriedades corretas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

      expect(chaiHttpResponse.body[0]).to.be.have.a.property('id');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('clubName');
    });

    it('Deveria retonar o status da requisição: 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Requisição para rota "GET /clubs/:id"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon
        .stub(ClubesService, 'getById')
        .resolves({
            id: 7,
            clubName: 'Flamengo'
          } as unknown as IClub);
    });

    after(() => {
      (ClubesService.getById as Sinon.SinonStub).restore();
    });

    it('Deveria retornar um objeto com as propriedades corretas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/7');

      expect(chaiHttpResponse.body).to.be.have.a('object');
      expect(chaiHttpResponse.body).to.be.have.a.property('id');
      expect(chaiHttpResponse.body).to.be.have.a.property('clubName');
    });

    it(`Deveria retornar o status da requisição: 200 para requisição válida`, async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/7');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });

    it(`Devria retornar id: 7 e clubName: "Flamengo" ao fazer a requisição para
      rota GET "/clubs/7"`, async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/7');

      expect(chaiHttpResponse.body.id).to.be.equal(7);
      expect(chaiHttpResponse.body.clubName).to.be.equal('Flamengo');
    });
  });
});