import { ILeaderboards } from '../interfaces/ILeaderboards';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
import { resultRanking, leaderboards } from '../functions/helpers';

export default class LeaderBoardService {
  static async getMatchResults() {
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
}
