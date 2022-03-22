import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';

import { IMatch } from "../interfaces/IMatch";
import MatchService from "../services/matchService";
import matchs = require('./mock/match.json');

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matchs', () => {
  describe('Requisição para "GET /matchs"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon.stub(MatchService, 'getAll')
        .resolves(matchs as IMatch[]);
    });

    after(() => {
      (MatchService.getAll as Sinon.SinonStub).restore();
    });
    it('Deveria retornar um array de matchs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

      expect(chaiHttpResponse.body).to.be.have.a('objetc');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('id');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('inProgress');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeClub');
    });
  });
});