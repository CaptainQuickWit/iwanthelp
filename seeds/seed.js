const sequelize = require('../config/connection');
const { Member, Card, Note, Comment } = require('../models');

const memberData = require('./memberData.json');
const cardData = require('./cardData.json');
const noteData = require('./noteData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // TO DO! CHECK the folowing code with a TA
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

  for (const note of noteData) {
    await Note.create({
      ...note,
      card_id: card.id,
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
