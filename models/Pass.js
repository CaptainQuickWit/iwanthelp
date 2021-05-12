const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Pass extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// MESH Member LOGIN DATA

Pass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true,
    //   },
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },

  // Hooks are automatic methods that run during various phases of the Pass Model lifecycle
  // In this case, before a Pass is created or updated, we will automatically hash their password
  {
    hooks: {
      beforeCreate: async (newPassData) => {
        newPassData.password = await bcrypt.hash(newPassData.password, 10);
        return newPassData;
      },
      beforeUpdate: async (updatedPassData) => {
        updatedPassData.password = await bcrypt.hash(updatedPassData.password, 10);
        return updatedPassData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pass',
  }
);

module.exports = Pass;
