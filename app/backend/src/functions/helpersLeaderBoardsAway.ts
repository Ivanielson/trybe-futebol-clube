import { ILeaderboardsAway } from '../interfaces/ILeaderboards';

type ResultMattch = [{
  homeTeamGoals: number;
  awayTeamGoals: number;
}];

export const pointsTeamAway = (matchsAway: ResultMattch) => {
  let pointsAway = 0;
  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) pointsAway += 3;
    if (homeTeamGoals === awayTeamGoals) pointsAway += 1;
  });

  return pointsAway;
};

export const victoriesDrawsLossesTeamAway = (matchsAway: ResultMattch) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;
  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (awayTeamGoals > homeTeamGoals) victories += 1;
    if (homeTeamGoals === awayTeamGoals) draws += 1;
    if (awayTeamGoals < homeTeamGoals) losses += 1;
  });

  return {
    victories,
    draws,
    losses,
  };
};

export const goalsFavorOwnAway = (matchsAway: ResultMattch) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matchsAway.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    goalsFavor += awayTeamGoals;
    goalsOwn += homeTeamGoals;
  });

  return {
    goalsFavor,
    goalsOwn,
  };
};

export const gamesAway = (matchsAway: ResultMattch): number => matchsAway.length;

export const pointsCalculatorAway = (resultMatchs: ILeaderboardsAway) => {
  const { awayClub } = resultMatchs;
  const points = pointsTeamAway(awayClub);
  const totalGames = gamesAway(awayClub);
  const { victories, draws, losses } = victoriesDrawsLossesTeamAway(awayClub);
  const { goalsFavor, goalsOwn } = goalsFavorOwnAway(awayClub);
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

export const leaderBoardsAway = (resultMatches: ILeaderboardsAway[]) => {
  const ranking = resultMatches.map((team) => ({
    name: team.clubName,
    totalPoints: pointsCalculatorAway(team).points,
    totalGames: pointsCalculatorAway(team).totalGames,
    totalVictories: pointsCalculatorAway(team).victories,
    totalDraws: pointsCalculatorAway(team).draws,
    totalLosses: pointsCalculatorAway(team).losses,
    goalsFavor: pointsCalculatorAway(team).goalsFavor,
    goalsOwn: pointsCalculatorAway(team).goalsOwn,
    goalsBalance: pointsCalculatorAway(team).goalsBalance,
    efficiency: pointsCalculatorAway(team).efficiency,
  }));

  return ranking;
};
