import { IMatch, IMatchNew } from '../interfaces/IMatch';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';

export default class MatchService {
  static async getAll() {
    try {
      const matchs = await Matchs.findAll({ include: [
        { model: Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        }, {
          model: Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ] });
      return matchs as unknown as IMatch[];
    } catch (error) {
      console.error(error);
    }
  }

  static async create(match: IMatchNew) {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress } = match;
    try {
      const newMatch = await Matchs.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
      });
      return {
        id: newMatch.id,
        ...match,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
