interface ILeaderboards {
  id: number;
  clubName: string;
  homeClub: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean
  }],
  awayClub: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }]
}

interface ILeaderboardsResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

interface ILeaderboardsHome {
  id: number;
  clubName: string;
  homeClub: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean
  }],
}

interface ILeaderboardsAway {
  id: number;
  clubName: string;
  awayClub: [{
    id: number;
    homeTeam: number;
    homeTeamGoals: number;
    awayTeam: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }]
}

export {
  ILeaderboards,
  ILeaderboardsResult,
  ILeaderboardsHome,
  ILeaderboardsAway,
};
