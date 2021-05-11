const Member = require('./Member');
const Card = require('./Card');
const Comment = require('./Comment');
const Note = require('./Note');

Card.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Member.hasMany(Card, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Member.hasMany(Comment, {
  foreignKey: 'member_id',
  onDelete: 'CASCADE'
});

Card.hasMany(Note, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});

Note.belongsTo(Card, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});

Card.hasMany(Comment, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Card, {
  foreignKey: 'card_id',
  onDelete: 'CASCADE'
});

module.exports = { Member, Card, Comment };
