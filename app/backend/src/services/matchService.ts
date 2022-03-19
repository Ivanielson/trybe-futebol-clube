import IMatch from '../interfaces/IMatch';
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
      ],
      raw: true });
      return matchs as unknown as IMatch[];
    } catch (error) {
      console.error(error);
    }
  }
}
