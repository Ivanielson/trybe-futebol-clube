import * as bcrypt from 'bcryptjs';
import { ILeaderboards, ILeaderboardsResult } from '../interfaces/ILeaderboards';
import IUser from '../interfaces/IUser';
import {
  victoriesDrawsLossesTeamHome,
  pointsTeamHome,
} from './helpersLeaderBoardsHome';

type ResultMattch = [{
  homeTeamGoals: number;
  awayTeamGoals: number;
}];

const toUserLogin = (user: IUser, token: string) => {
  const { id, username, role, email } = user;
  return {
    user: {
      id,
      username,
      role,
      email,
    },
    token,
  };
};

const checkPassword = (hashDb: string, password: string) => {
  const check = bcrypt.compareSync(password, hashDb);
  return check;
};

const pointsTeam = (matchsHome: ResultMattch, matchsAway: ResultMattch) => {
  const pointsHome = pointsTeamHome(matchsHome);
  let pointsAway = 0;
  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) pointsAway += 3;
    if (homeTeamGoals === awayTeamGoals) pointsAway += 1;
  });

  return {
    pointsHome,
    pointsAway,
  };
};

// retorna vitórias, empates e derrotas de jogos Fora (para Classificação Away)

const victoriesDrawsLossesTeamAway = (matchsAway: ResultMattch) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;
  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) victories += 1;
    if (awayTeamGoals === homeTeamGoals) draws += 1;
    if (awayTeamGoals < homeTeamGoals) losses += 1;
  });

  return {
    victories,
    draws,
    losses,
  };
};

// retorna vitórias, empates e derrotas de todos os jogos ( para Classificação Geral)

const victoriesDrawsLossesTeam = (matchsHome: ResultMattch, matchsAway: ResultMattch) => {
  const resultHome = victoriesDrawsLossesTeamHome(matchsHome);
  const resultAway = victoriesDrawsLossesTeamAway(matchsAway);

  return {
    victories: resultHome.victories + resultAway.victories,
    draws: resultHome.draws + resultAway.draws,
    losses: resultHome.losses + resultAway.losses,
  };
};

const goalsFavorOwn = (matchsHome: ResultMattch, matchsAway: ResultMattch) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    goalsFavor += homeTeamGoals;
    goalsOwn += awayTeamGoals;
  });

  matchsAway.forEach(({ awayTeamGoals, homeTeamGoals }) => {
    goalsFavor += awayTeamGoals;
    goalsOwn += homeTeamGoals;
  });

  return {
    goalsFavor,
    goalsOwn,
  };
};

const games = (matchsHome: ResultMattch, matchsAway: ResultMattch) => {
  const gamesHome = matchsHome.length;
  const gamesAway = matchsAway.length;
  return {
    gamesHome,
    gamesAway,
  };
};

const pointsCalculator = (resultMatches: ILeaderboards) => {
  const { homeClub, awayClub } = resultMatches;
  const { pointsHome, pointsAway } = pointsTeam(homeClub, awayClub);
  const { gamesHome, gamesAway } = games(homeClub, awayClub);
  const { victories, draws, losses } = victoriesDrawsLossesTeam(homeClub, awayClub);
  const { goalsFavor, goalsOwn } = goalsFavorOwn(homeClub, awayClub);
  const efficiency = Number((((pointsHome + pointsAway) / ((gamesHome + gamesAway) * 3)) * 100)
    .toFixed(2));

  return {
    totalGames: gamesHome + gamesAway,
    points: pointsHome + pointsAway,
    draws,
    victories,
    losses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency,
  };
};

const leaderboards = (resultMatches: ILeaderboards[]) => {
  const ranking = resultMatches.map((team) => ({
    name: team.clubName,
    totalPoints: pointsCalculator(team).points,
    totalGames: pointsCalculator(team).totalGames,
    totalVictories: pointsCalculator(team).victories,
    totalDraws: pointsCalculator(team).draws,
    totalLosses: pointsCalculator(team).losses,
    goalsFavor: pointsCalculator(team).goalsFavor,
    goalsOwn: pointsCalculator(team).goalsOwn,
    goalsBalance: pointsCalculator(team).goalsBalance,
    efficiency: pointsCalculator(team).efficiency,
  }));

  return ranking;
};

const resultRanking = (board: ILeaderboardsResult[]) => {
  const resulOrder = board.sort((a, b) => b.totalPoints - a.totalPoints)
    .sort((a, b) => {
      if (a.totalPoints === b.totalPoints) return b.goalsBalance - a.goalsBalance;
      return 0;
    }).sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.totalVictories === b.totalVictories) {
        return b.goalsFavor - a.goalsFavor;
      }
      return 0;
    }).sort((a, b) => {
      if ((a.totalPoints === b.totalPoints
        && a.totalVictories === b.totalVictories
        && a.goalsFavor === b.goalsFavor)) {
        return b.goalsBalance - a.goalsBalance;
      }
      return 0;
    });

  return resulOrder;
};

export { toUserLogin, checkPassword, leaderboards, resultRanking };
