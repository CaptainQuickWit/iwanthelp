const sequelize = require('../config/connection');
const { Member, Card, Comment } = require('../models');

const memberData = require('./memberData.json');
const cardData = require('./cardData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const members = await Member.bulkCreate(memberData, {
    individualHooks: true,
    returning: true,
  });

  for (const card of cardData) {
    await Card.create({
      ...card,
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      // card_id: card[Math.floor(Math.random() * card.length)].id, A car_id for each comment will be useful but failed here!
      member_id: members[Math.floor(Math.random() * members.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
