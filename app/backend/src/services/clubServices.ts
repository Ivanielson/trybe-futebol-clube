import IClub from '../interfaces/IClub';
import Clubs from '../database/models/Clubs';

export default class ClubesService {
  static async getAll() {
    try {
      const clubs = await Clubs.findAll({ raw: true });
      return clubs as unknown as IClub[];
    } catch (error) {
      console.error(error);
    }
  }

  static async getById(id: number) {
    try {
      const club = await Clubs.findByPk(id, { raw: true });
      return club as unknown as IClub;
    } catch (error) {
      console.error(error);
    }
  }
}
