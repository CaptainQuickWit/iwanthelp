const router = require('express').Router();
const { Comment, Card, Member } = require('../models');
const withAuth = require('../utils/auth');

// RENDERS meshboard.handlebars
router.get('/meshboard', withAuth, async (req, res) => {
  console.log('/meshboard route hit. Logged in: ', req.session.logged_in);
  try {
    // Get all cards and JOIN with  data
    const cardData = await Card.findAll({
      // attributes: { exclude: ['call_description', 'offer_description'] },
      include: [
        {
          model: Member,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it. This is the "cards" we use at meshboard.handlebars. 
    const cards = cardData.map((card) => card.get({ plain: true }));
    // console.log(cards);

    const cardCalls = cards.map((card) => {
      return {id: card.id, call_category: card.call_category, call_keywords: card.call_keywords, username: card.member.username}
      });
    console.log(cardCalls);

    const cardOffers = cards.map((card) => {
      return {id: card.id, offer_category: card.offer_category, offer_keywords: card.offer_keywords, offer_description: card.offer_description, username: card.member.username}
      });
    console.log(cardOffers);



    // Pass serialized data and session flag into template. "req.session" is sort of a little environment where we can set up variables that can only exist within a user's session. "req.session.logged_in" specifies a "logged_in" variable. Then we define a property called logged_in and pass it to res.render so that variable will be rendered. It allows each user have data associated to their visit to the page. Where is this variable coming from? We initialized it at main.handlebars and homepage view includes it.

    res.render('meshboard', {
      cardCalls,
      cardOffers, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS meshcard.handlebars
router.get('/meshcard/:id', withAuth, async (req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id, {
      include: [
        {
          model: Member,
          attributes: { exclude: ['password'] }
        },
        {
          model: Comment,
          // right: true
          // attributes: ['call_comment', 'offer_comment', 'member_id', 'card_id'],
        },
      ],
    });

    // ASK!!! WHY THIS IS DIFFERENT THAN THE SERIALIZE ABOVE - BECAUSE WE HAVE MANY CARDS VS SINGLE CARD?
    const card = cardData.get({ plain: true });
    console.log(card);
    res.render('meshcard', {
      ...card,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS member.handlebars
// Use withAuth middleware to prevent access to route
router.get('/member', withAuth, async (req, res) => {
  console.log('/member route hit. Logged in: ', req.session.logged_in);

  try {
    // Find the logged in user based on the session ID
    const memberData = await Member.findByPk(req.session.member_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Card }],
    });

    const member = memberData.get({ plain: true });
    console.log(member),
    res.render('member', {
      ...member,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS "LOGIN" PAGE (login.handlebars)
router.get('/', (req, res) => {
  console.log('/ route hit. Logged in: ', req.session.logged_in);

  // If the user is already logged in, hence req.sessions.logged_in is TRUE redirect the request to homepage at root.
  if (req.session.logged_in) {
    res.redirect('/meshboard');
    return;
  }

  res.render('login');
});

// For the "RESULTS" PAGE ('/results') Can we use the homepage.handlebars?


module.exports = router;