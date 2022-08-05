const User = require('../models/User');
// const bcrypt = require('bcryptjs');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middleware/checkAuth');
const router = require('express').Router();

//UPDATE  verifyTokenAndAuthorization
router.patch(
  '/updateUser/:id',
  verifyTokenAndAuthorization,
  async (req, res) => {
    console.log(req.body);
    // let {
    //   first_name,
    //   last_name,
    //   username,
    //   email,
    //   address,
    //   // password,
    //   // confirm_password,
    //   phone_number,
    //   isAdmin,
    // } = req.body;
    // if (password === confirm_password) {
    //   const salt = await bcrypt.genSalt(10);
    //   password = await bcrypt.hash(password, salt);
    // } else {
    //   res.status(400).send('Password must match');
    //   return;
    // }
    try {
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        }
        // { new: true }
      );
      res.status(200).send('User updated sucessfully');
    } catch (err) {
      res.status(500).send('Error updating user');
    }
  }
);

//DELETE
router.delete(
  '/deleteUser/:id',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send('User has been deleted');
    } catch (err) {
      res.status(500).send('Error deleting user');
    }
  }
);

//GET USER
router.get('/getUser/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherInfo } = user._doc;
    res.status(200).send(otherInfo);
  } catch (err) {
    res.status(500).send('Error getting user');
  }
});

//GET ALL USER    //verifyTokenAndAdmin,
router.get('/getAllUsers', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send('Error listing all users');
  }
});

//GET USER STATS
router.get('/getStats', verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Error getting users statistics');
  }
});

module.exports = router;
