// Here is where we set up our Dish model, for when we are ready to connect to a database in future activities. 

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

  // TO DO! limit the number of characters to 500 in descriptions, now it is 255 words?
    call_comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    offer_comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  // TO DO! turn type into .DATEONLY after checking .DATE
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    member_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'member',
        key: 'id',
      },
    },
    card_id: {
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
    modelName: 'comment',
  }
);

module.exports = Comment;

// is_: {
//   type: DataTypes.BOOLEAN,
// },

    

   