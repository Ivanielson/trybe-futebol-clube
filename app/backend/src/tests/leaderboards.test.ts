import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as Sinon from "sinon";

import { Response } from 'superagent';

import { app } from '../app';
import { ILeaderboardsResult } from "../interfaces/ILeaderboards";
import LeaderBoardService from "../services/leaderboardService";
import { leaderboards, leaderboardsAway, leaderboardsHome } from "./mock/leaderboard";

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas leaderboards', () => {
  describe('Requisição para "GET /leaderboard"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon.stub(LeaderBoardService, 'getLeaderboard')
        .resolves(leaderboards as ILeaderboardsResult[]);
    });

    after(() => {
      (LeaderBoardService.getLeaderboard as Sinon.SinonStub).restore();
    });

    it('Deveria retornar uma array de objetos com as propriedades corretas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      expect(chaiHttpResponse.body).to.be.have.a('array');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('name');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalPoints');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalGames');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalVictories');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalDraws');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalLosses');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsFavor');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsOwn');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsBalance');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('efficiency');
    });

    it('Deveria retonar os 3 primeiros colocados na classificação: "1º Palmeiras", "2º Corinthians" e "3º Santos"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      expect(chaiHttpResponse.body[0].name).to.be.equal('Palmeiras');
      expect(chaiHttpResponse.body[1].name).to.be.equal('Corinthians');
      expect(chaiHttpResponse.body[2].name).to.be.equal('Santos');
    });

    it('Deveria retornar um array com a quantidade de objetos correto e o status da requisição: 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.length(7);
    });
  });

  describe('Requisição para "GET /leaderboard/home"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon.stub(LeaderBoardService, 'getLeaderboardHome')
        .resolves(leaderboardsHome as ILeaderboardsResult[]);
    });

    after(() => {
      (LeaderBoardService.getLeaderboardHome as Sinon.SinonStub).restore();
    });

    it('Deveria retornar uma array de objetos com as propriedades corretas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard');

      expect(chaiHttpResponse.body).to.be.have.a('array');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('name');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalPoints');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalGames');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalVictories');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalDraws');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalLosses');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsFavor');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsOwn');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsBalance');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('efficiency');
    });

    it('Deveria retonar os 3 primeiros colocados na classificação: "1º Santos", "2º Palmeiras" e "3º Corinthians"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.body[0].name).to.be.equal('Santos');
      expect(chaiHttpResponse.body[1].name).to.be.equal('Palmeiras');
      expect(chaiHttpResponse.body[2].name).to.be.equal('Corinthians');
    });

    it('Deveria retornar um array com a quantidade de objetos correto e o status da requisição: 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.length(5);
    });
  });

  describe('Requisição para "GET /leaderboard/away"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      Sinon.stub(LeaderBoardService, 'getLeaderboardAway')
        .resolves(leaderboardsAway as ILeaderboardsResult[]);
    });

    after(() => {
      (LeaderBoardService.getLeaderboardAway as Sinon.SinonStub).restore();
    });

    it('Deveria retornar uma array de objetos com as propriedades corretas', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(chaiHttpResponse.body).to.be.have.a('array');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('name');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalPoints');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalGames');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalVictories');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalDraws');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('totalLosses');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsFavor');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsOwn');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('goalsBalance');
      expect(chaiHttpResponse.body[0]).to.be.have.a.property('efficiency');
    });

    it('Deveria retonar os 3 primeiros colocados na classificação: "1º Palmeiras", "2º Corinthians" e "3º Internacional"', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(chaiHttpResponse.body[0].name).to.be.equal('Palmeiras');
      expect(chaiHttpResponse.body[1].name).to.be.equal('Corinthians');
      expect(chaiHttpResponse.body[2].name).to.be.equal('Internacional');
    });

    it('Deveria retornar um array com a quantidade de objetos correto e o status da requisição: 200', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.length(6);
    });
  });
});