const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    call_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // TO DO! limit the number of characters to 500 in descriptions
    call_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // TO DO! turn type into .DATEONLY after checking .DATE
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // TO DO! URGENT info can be added?
    // is_urgent: {
    //   type: DataTypes.BOOLEAN,
    // },
    
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'card',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'note',
  }
);

module.exports = Note;
