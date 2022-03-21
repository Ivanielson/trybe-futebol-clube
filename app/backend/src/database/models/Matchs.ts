import { DataTypes, Model } from 'sequelize';
import db from '.';
import Clubs from './Clubs';
// import OtherModel from './OtherModel';

class Matchs extends Model {
  // public <campo>!: <tipo>;
  id: number;

  homeTeam: number;

  homeTeamGols: number;

  awayTeam: number;

  awayTeamGols: number;

  inProgress: number;
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'matchs',
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });

Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', as: 'homeClub' });
Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Matchs;
