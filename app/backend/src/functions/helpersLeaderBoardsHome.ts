import { ILeaderboardsHome } from '../interfaces/ILeaderboards';

type ResultMattch = [{
  homeTeamGoals: number;
  awayTeamGoals: number;
}];

export const pointsTeamHOme = (matchsHome: ResultMattch) => {
  let pointsHome = 0;
  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) pointsHome += 3;
    if (homeTeamGoals === awayTeamGoals) pointsHome += 1;
  });

  return pointsHome;
};

export const victoriesDrawsLossesTeamHome = (matchsHome: ResultMattch) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;
  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) victories += 1;
    if (homeTeamGoals === awayTeamGoals) draws += 1;
    if (homeTeamGoals < awayTeamGoals) losses += 1;
  });

  return {
    victories,
    draws,
    losses,
  };
};

export const goalsFavorOwnHome = (matchsHome: ResultMattch) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matchsHome.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    goalsFavor += homeTeamGoals;
    goalsOwn += awayTeamGoals;
  });

  return {
    goalsFavor,
    goalsOwn,
  };
};

export const gamesHome = (matchsHome: ResultMattch): number => matchsHome.length;

export const pointsCalculatorHome = (resultMatchs: ILeaderboardsHome) => {
  const { homeClub } = resultMatchs;
  const points = pointsTeamHOme(homeClub);
  const totalGames = gamesHome(homeClub);
  const { victories, draws, losses } = victoriesDrawsLossesTeamHome(homeClub);
  const { goalsFavor, goalsOwn } = goalsFavorOwnHome(homeClub);
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

export const leaderBoardsHome = (resultMatches: ILeaderboardsHome[]) => {
  const ranking = resultMatches.map((team) => ({
    name: team.clubName,
    totalPoints: pointsCalculatorHome(team).points,
    totalGames: pointsCalculatorHome(team).totalGames,
    totalVictories: pointsCalculatorHome(team).victories,
    totalDraws: pointsCalculatorHome(team).draws,
    totalLosses: pointsCalculatorHome(team).losses,
    goalsFavor: pointsCalculatorHome(team).goalsFavor,
    goalsOwn: pointsCalculatorHome(team).goalsOwn,
    goalsBalance: pointsCalculatorHome(team).goalsBalance,
    efficiency: pointsCalculatorHome(team).efficiency,
  }));

  return ranking;
};
