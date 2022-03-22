import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';
import IClub from "../interfaces/IClub";
import ClubesService from "../services/clubServices";
import allClubs = require('./mock/club.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /clubs', () => {
  describe('Requisição para rota "GET /clubs"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon
        .stub(ClubesService, 'getAll')
        .resolves(allClubs as unknown as IClub[]);
    });

    after(() => {
      (ClubesService.getAll as Sinon.SinonStub).restore();
    });

    it('deveria retornar um array de clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');

      expect(chaiHttpResponse.body).to.be.have.a('object');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('id');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('clubName');
      expect(chaiHttpResponse.body).to.be.have.length(16);
    });
  });
});