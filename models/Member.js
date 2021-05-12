const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Member extends Model {}
 Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    // TO DO! email belongs to the school so it must end with --unc.edu
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    school_and_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // TO DO! turn type into .DATEONLY after checking .DATE
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    pass_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'pass',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'member',
  }
);

module.exports = Member;
