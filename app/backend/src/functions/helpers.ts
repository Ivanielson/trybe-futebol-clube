import * as bcrypt from 'bcryptjs';
import { ILeaderboards, ILeaderboardsResult } from '../interfaces/ILeaderboards';
import IUser from '../interfaces/IUser';

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
  let points = 0;
  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) points += 3;
    if (homeTeamGoals === awayTeamGoals) points += 1;
  });
  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) points += 3;
    if (homeTeamGoals === awayTeamGoals) points += 1;
  });

  return points;
};

const victoriesDrawsLossesTeam = (matchsHome: ResultMattch, matchsAway: ResultMattch) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;
  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victories += 1;
    if (homeTeamGoals === awayTeamGoals) draws += 1;
    if (homeTeamGoals < awayTeamGoals) losses += 1;
  });
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
  const totalGames = matchsHome.length + matchsAway.length;
  return totalGames;
};

const pointsCalculator = (resultMatches: ILeaderboards) => {
  const { homeClub, awayClub } = resultMatches;
  const points = pointsTeam(homeClub, awayClub);
  const totalGames = games(homeClub, awayClub);
  const { victories, draws, losses } = victoriesDrawsLossesTeam(homeClub, awayClub);
  const { goalsFavor, goalsOwn } = goalsFavorOwn(homeClub, awayClub);
  const efficiency = Number(((points / (totalGames * 3)) * 100).toFixed(2));

  return {
    totalGames,
    points,
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
  // const resulOrder = board
  //   .sort((a, b) => b.totalPoints - a.totalPoints)
  //   .sort((a, b) => b.goalsBalance - a.goalsBalance)
  //   .sort((a, b) => b.goalsFavor - a.goalsFavor)
  //   .sort((a, b) => b.goalsOwn - a.goalsOwn);
  const resulOrder = board.sort((a, b) => b.totalPoints - a.totalPoints);

  return resulOrder;
};

export { toUserLogin, checkPassword, leaderboards, resultRanking };
