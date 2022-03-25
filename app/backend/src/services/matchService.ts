import { IMatch, IMatchNew } from '../interfaces/IMatch';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';

type MatchUpdate = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default class MatchService {
  static async getAll(): Promise<IMatch[] | undefined> {
    try {
      const matchs = await Matchs.findAll({
        include: [
          { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
          { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
      return matchs as unknown as IMatch[];
    } catch (error) {
      console.error(error);
    }
  }

  static async create(match: IMatchNew): Promise<object | undefined> {
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

  static async finishMatch(id: number, inProgress: number): Promise<object | undefined> {
    try {
      await Matchs.update({ inProgress }, { where: { id } });
      return { inProgress };
    } catch (error) {
      console.error(error);
    }
  }

  static async updateMatch(id: number, goals: MatchUpdate): Promise<object | undefined> {
    try {
      const { homeTeamGoals, awayTeamGoals } = goals;
      await Matchs.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
      return {
        homeTeamGoals,
        awayTeamGoals,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
