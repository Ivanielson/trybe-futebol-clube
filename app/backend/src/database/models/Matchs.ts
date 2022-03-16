import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';
// import OtherModel from './OtherModel';

class Matchs extends Model {
  // public <campo>!: <tipo>;
  declare id: number;

  declare homeTeam: number;

  declare homeTeamGols: number;

  declare awayTeam: number;

  declare awayTeamGols: number;

  declare inProgress: number;
}

Matchs.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'matchs',
  timestamps: false,
});

Clubs.belongsTo(Matchs, { foreignKey: 'id', as: 'ClubId' });

Matchs.hasMany(Clubs, { foreignKey: 'id', as: 'ClubId' });

export default Matchs;
