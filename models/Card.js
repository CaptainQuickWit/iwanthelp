const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model {}

Card.init(
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
    call_keywords: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    // TO CHECK! string stores up to 255 characters by default. What to do at front end if we want to warn the user - ALERT?
    call_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer_keywords: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    offer_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATEONLY,
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
        model: 'member',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
  }
);

module.exports = Card;
