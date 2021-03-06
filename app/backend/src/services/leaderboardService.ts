import { ILeaderboards, ILeaderboardsAway, ILeaderboardsHome } from '../interfaces/ILeaderboards';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import { resultRanking, leaderboards } from '../functions/helpers';
import { leaderBoardsHome } from '../functions/helpersLeaderBoardsHome';
import { leaderBoardsAway } from '../functions/helpersLeaderBoardsAway';

export default class LeaderBoardService {
  static async getLeaderboard() {
    try {
      const matchs = await Clubs.findAll({
        include: [
          { model: Matchs, as: 'homeClub', where: { inProgress: false } },
          { model: Matchs, as: 'awayClub', where: { inProgress: false } },
        ],
      });
      const result = leaderboards(matchs as unknown as ILeaderboards[]);
      const ranking = resultRanking(result);
      return ranking;
    } catch (error) {
      console.error(error);
    }
  }

  static async getLeaderboardHome() {
    try {
      const matchs = await Clubs.findAll({
        include: [
          { model: Matchs, as: 'homeClub', where: { inProgress: false } },
        ],
      });
      const result = leaderBoardsHome(matchs as unknown as ILeaderboardsHome[]);
      const ranking = resultRanking(result);
      return ranking;
    } catch (error) {
      console.error(error);
    }
  }

  static async getLeaderboardAway() {
    try {
      const matchs = await Clubs.findAll({
        include: [
          { model: Matchs, as: 'awayClub', where: { inProgress: false } },
        ],
      });
      const result = leaderBoardsAway(matchs as unknown as ILeaderboardsAway[]);
      const ranking = resultRanking(result);
      return ranking;
    } catch (error) {
      console.error(error);
    }
  }
}
