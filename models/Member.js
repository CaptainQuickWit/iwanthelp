const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Member extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// MESH MEMBER LOGIN DATA

Member.init(
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

  // Hooks are automatic methods that run during various phases of the Member Model lifecycle
  // In this case, before a Member is created or updated, we will automatically hash their password
  {
    hooks: {
      beforeCreate: async (newMemberData) => {
        newMemberData.password = await bcrypt.hash(newMemberData.password, 10);
        return newMemberData;
      },
      beforeUpdate: async (updatedMemberData) => {
        updatedMemberData.password = await bcrypt.hash(updatedMemberData.password, 10);
        return updatedMemberData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'member',
  }
);

module.exports = Member;
