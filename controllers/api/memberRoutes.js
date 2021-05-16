const router = require('express').Router();
const { Member } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new mesh account with "Member" model
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newMember = await Member.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      school_and_program: req.body.school_and_program,
    });

// Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.member_id = newMember.id;
      //req.session.username = newMember.username;
      req.session.logged_in = true;

      res.status(200).json(newMember);
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
      req.session.member_id = memberData.id;
      req.session.username = memberData.username;
      req.session.logged_in = true;
      
      res.json({ member: memberData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
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

// DELETE existing mesh member with "Member" model
// TO ASK !!!! member page has no id will it affect this?
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

// WE WILL ADD AN UPDATE ACCOUNT ROUTE HERE!

module.exports = router;