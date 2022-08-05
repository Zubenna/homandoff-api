const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/checkAuth');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

router.post('/createUser', async (req, res) => {
  // Get user details
  console.log('Tracking Register Error');
  try {
    let {
      first_name,
      last_name,
      username,
      email,
      address,
      password,
      confirm_password,
      phone_number,
      isAdmin,
    } = req.body;

    // Vallidate number of phone digits
    let myRegex = /^[0-9]{11}$/;
    if (!phone_number.match(myRegex)) {
      res.status(400).send({ msg: 'Phone number must be 11 digits only' });
      return;
    }

    // Check required fields
    if (
      !(
        first_name &&
        last_name &&
        email &&
        address &&
        password &&
        confirm_password &&
        phone_number
      )
    ) {
      res.status(400).send({ msg: 'Required fields must not be empty' });
      return;
    }

    // Check dupllicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).send({ msg: 'Email already exist' });
      return;
    }

    // Check dupllicate username
    const existingUname = await User.findOne({ username });
    if (existingUname) {
      res.status(400).send({ msg: 'Username already exist' });
      return;
    }

    // Check username length
    const nameLength = username.length;
    if (!(nameLength >= 6 && nameLength < 16)) {
      res
        .status(400)
        .send({ msg: 'Username must be in the range 8 - 15 characters' });
      return;
    }

    // Check dupllicate phone number
    const existingNumber = await User.findOne({ phone_number });
    if (existingNumber) {
      res.status(400).send({ msg: 'Phone Number already exist' });
      return;
    }
    // Confirm and Encrypt password
    if (password === confirm_password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    } else {
      res.status(400).send({ msg: 'Password must match' });
      return;
    }
    // console.log("Tracking Befor Create")
    // Create user
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      address,
      password,
      phone_number,
      isAdmin,
    });
    return res.status(200).send({ msg: 'Account created successfully' });
  } catch (err) {
    res.status(500).send({ msg: 'Error occurred during registration' });
  }
});

router.post('/loginUser', async (req, res) => {
  try {
    // Get user input
    let { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send({ msg: 'Enter your login details' });
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });
    !user && res.status(401).send('Wrong credentials!');
    if (user && (await bcrypt.compare(password, user.password))) {
      //  Create token
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
      );

      user.token = accessToken;

      //   await generateToken(res, id, email);
      // console.log(accessToken);
      // Store user details in session
      //   req.session.user = {
      //     first_name: user.first_name,
      //     last_name: user.last_name,
      //     phone_number: user.phone_number,
      //     email: user.email,
      //   };
      const { password, ...others } = user._doc;
      res.status(200).send({ ...others });
      // res.status(200).send({ msg: 'You are logged in' });
      return;
    }

    return res.status(400).send({ msg: 'Invalid credentials' });
  } catch (err) {
    res.send({ msg: 'There is error logging in' });
  }
});

router.get('/logoutUser', (req, res) => {
  const authHeader = req.headers['authorization'];
  jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send('Logged out successfully');
    } else {
      res.send('Error logging out');
    }
  });
});

module.exports = router;
