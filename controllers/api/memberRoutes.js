const router = require('express').Router();
const { Member } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new mesh account with "Member" model
router.post('/', async (req, res) => {
  try {
    const memberData = await Member.create({
      username: req.body.username,
      password: req.body.password,
    });

// Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.member_id = memberData.id;
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
    const memberData = await Member.findOne({ where: { username: req.body.username } });

    if (!memberData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await memberData.checkPassword(req.body.password);

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

// MESH LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// CREATE new member with "Member" model
router.post('/', withAuth, async (req, res) => {
  try {
    const newMember = await Member.create({
      ...req.body,
      member_id: req.session.member_id,
    });

    res.status(200).json(newMember);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE member account with "Member" model
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.id,
        member_id: req.session.member_id,
      },
    });

    if (!memberData) {
      res.status(404).json({ message: 'No member found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// WE WILL ADD AN UPDATE ROUTE HERE!


module.exports = router;
