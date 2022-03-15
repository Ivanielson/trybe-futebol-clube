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
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
Clubs.belongsTo(Matchs, { foreignKey: 'id', as: 'ClubId' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Matchs.hasMany(Clubs, { foreignKey: 'id', as: 'ClubId' });
// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matchs;
