const router = require('express').Router();
const { Pass } = require('../../models');

// CREATE NEW MESH MEMBER THROUGH "PASS MODEL" TO DO - ASK TA!!!!
router.post('/', async (req, res) => {
  try {
    const passData = await Pass.create({
      username: req.body.username,
      password: req.body.password,
    });

// Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.pass_id = passData.id;
      req.session.logged_in = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// MESH LOGIN
router.post('/login', async (req, res) => {
  try {
    const passData = await Pass.findOne({ where: { username: req.body.username } });

    if (!passData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await passData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// MESH LOG OUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
