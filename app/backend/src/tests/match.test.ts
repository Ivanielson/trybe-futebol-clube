import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';

import { IMatch } from '../interfaces/IMatch';
import MatchService from "../services/matchService";
import { matchs, matchCreate } from './mock/match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas matchs', () => {
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

        expect(chaiHttpResponse.body).to.be.have.a('array');
        expect(chaiHttpResponse.body).to.be.have.length(3);
    });

    it('Deveria as propriedades matchs corretamente', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

      expect(chaiHttpResponse.body[0]).to.be.have.a.property('id');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('inProgress');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('homeClub');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('awayClub');
      expect(chaiHttpResponse.body[0].homeClub).to.be.have.a.property('clubName');
      expect(chaiHttpResponse.body[0].awayClub).to.be.have.a.property('clubName');
    });

    it('Deveria retornar o status da requisição: 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');

      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Requisição para "POST /matchs" com Token válido', () => {
    let chaiHttpResponse: Response;
    let chaiHttpLogin: Response;
    type NewMatch = {
      id: number;
      homeTeam: number;
      awayTeam: number;
      homeTeamGoals: number;
      awayTeamGoals: number;
      inProgress: boolean;
    }

    const payLoad = {
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
      inProgress: true
    }

    const user = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    };

    before(async () => {
      Sinon.stub(MatchService, 'create')
        .resolves(matchCreate as NewMatch);

      chaiHttpLogin = await chai
        .request(app)
        .post('/login')
        .send(user);
    });

    after(() => {
      (MatchService.create as Sinon.SinonStub).restore();
    });

    it('Deveria retorna um objeto com as propriedades corretas', async () => {
      const token = chaiHttpLogin.body.token;
  /* Utilizei com referencia o conteúdo desse link para entender como
    enviar informações no headers da requisição*/
  // REF: https://stackoverflow.com/questions/57668262/how-to-send-headers-authorization-bearer-token-in-mocha-test-cases
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .set({ Authorization: token })
        .send(payLoad);

      expect(chaiHttpResponse.body).to.be.have.a('object');
      expect(chaiHttpResponse.body).to.be.have.a.property('homeTeam');
      expect(chaiHttpResponse.body).to.be.have.a.property('homeTeamGoals');
      expect(chaiHttpResponse.body).to.be.have.a.property('awayTeamGoals');
      expect(chaiHttpResponse.body).to.be.have.a.property('inProgress');

    });

    it('Deveria retor o status da requisição: 201', async () => {
      const token = chaiHttpLogin.body.token;
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .set({ Authorization: token })
        .send(payLoad);

      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });
});