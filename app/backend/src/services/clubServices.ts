import IClub from '../interfaces/IClub';
import Clubs from '../database/models/Clubs';

export default class ClubesService {
  static async getAll() {
    try {
      const allClubs = await Clubs.findAll({ raw: true });
      return allClubs as unknown as IClub[];
    } catch (error) {
      console.error(error);
    }
  }
}
