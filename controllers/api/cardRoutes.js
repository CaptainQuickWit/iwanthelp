const router = require('express').Router();
const { Card } = require('../../models');
const withAuth = require('../../utils/auth');

// ADD MESH CARD
router.post('/', withAuth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      member_id: req.session.member_id,
    });

    res.status(200).json(newCard);
  } catch (err) {
    res.status(400).json(err);
  }
});

// REMOVE MESH CARD
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.destroy({
      where: {
        id: req.params.id,
        member_id: req.session.member_id,
      },
    });

    if (!cardData) {
      res.status(404).json({ message: 'No meshcard found with this id!' });
      return;
    }
    
    res.status(200).json(cardData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// WE WILL ADD AN UPDATE ROUTE HERE!

module.exports = router;
