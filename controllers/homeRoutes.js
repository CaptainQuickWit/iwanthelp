const router = require('express').Router();
const { Comment, Card, Member } = require('../models');
const withAuth = require('../utils/auth');

// RENDERS "HOMEPAGE" (MESHBOARD) PAGE (homepage.handlebars)
router.get('/', async (req, res) => {
  try {
    // Get all cards and JOIN with  data
    const cardData = await Card.findAll({
      include: [
        {
          model: Member,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const cards = cardData.map((card) => card.get({ plain: true }));

    // Pass serialized data and session flag into template. "req.session" is sort of a little environment where we can set up variables that can only exist within a user's session. "req.session.logged_in" specifies a "logged_in" variable. Then we define a property called logged_in and pass it to res.render so that variable will be rendered. It allows each user have data associated to their visit to the page. Where is this variable coming from? We initialized it at main.handlebars and homepage view includes it.

    // HOMEPAGE.HANDLEBARS has the view to our meshboard (rename or delete meshboard.handlebars)
    res.render('homepage', { 
      cards, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS "MESHCARD" PAGE (meshcard.handlebars)
router.get('/meshcard/:id', async (req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id, {
      include: [
        {
          model: Member,
          attributes: ['first_name', 'last_name', 'email', 'school_and_program', 'date_created'],
        },
        {
          model: Comment,
          attributes: ['call_comment', 'offer_comment', 'member_id', 'card_id'],
        },
      ],
    });

    const card = cardData.get({ plain: true });

    res.render('meshcard', {
      ...card,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS "MEMBER" PAGE (member.handlebars)
// Use withAuth middleware to prevent access to route
router.get('/member', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const memberData = await Member.findByPk(req.session.member_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Card }],
    });

    const member = memberData.get({ plain: true });
    res.render('member', {
      ...member,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// RENDERS "LOGIN" PAGE (login.handlebars)
router.get('/login', (req, res) => {
  // If the user is already logged in, hence req.sessions.logged_in is TRUE redirect the request to homepage at root.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// For the "MESHBOARD-RESULTS" PAGE ('/meshboard-results') Can we use the homepage.handlebars?

module.exports = router;
