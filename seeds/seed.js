const sequelize = require('../config/connection');
const { Pass, Member, Card, Comment } = require('../models');

const passData = require('./passData.json');
const memberData = require('./memberData.json');
const cardData = require('./cardData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // TO DO! CHECK the folowing code with a TA
  const pass = await Pass.bulkCreate(passData, {
    individualHooks: true,
    returning: true,
  });

  for (const members of memberData) {
    await Member.create({
      ...members,
      pass_id: pass.id,
    });
  }

  for (const card of cardData) {
    await Card.create({
      ...card,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      card_id: card.id,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
