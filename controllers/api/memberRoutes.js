const router = require('express').Router();
const { Member } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE NEW MEMBER THROUGH "MEMBER MODEL"

router.post('/', withAuth, async (req, res) => {
  try {
    const newMember = await Member.create({
      ...req.body,
      // ASK ABOUT THIS ID REFERENCE HERE - DOES IT STAY SAME?
      pass_id: req.session.pass_id,
    });

    res.status(200).json(newMember);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const memberData = await Member.destroy({
      where: {
        id: req.params.id,
        pass_id: req.session.pass_id,
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
