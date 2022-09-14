const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const login = asyncHandler(async (req, res) => {
  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ msg: 'Enter your login details' });
  }

  // Validate if user exist in our database
  const user = await User.findOne({ email }).exec();

  !user && res.status(401).json({ msg: 'Wrong credentials!' });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ msg: 'Unauthorized' });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        isAdmin: user.isAdmin,
      },
    },
    process.env.ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_SECRET,
    { expiresIn: '5h' }
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 5 * 24 * 60 * 60 * 1000,
  });

  const result = {
    email: user.email,
    isAdmin: user.isAdmin,
    first_name: user.first_name,
    address: user.address,
    id: user._id,
    phone_number: user.phone_number,
  };

  // Send user information and access token to user
  return res.json({ accessToken, result });
  // return res.status(200).send({ accessToken, result });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log('cookies in refresh', cookies);
  if (!cookies?.refreshToken) {
    console.log('Inside unauthorized if for 403');
    return res.status(403).json({ msg: 'Unauthorized' });
  }
  const refreshToken = cookies.refreshToken;
  console.log('New refresh token', refreshToken);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ msg: 'Forbidden' });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ msg: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            isAdmin: foundUser.isAdmin,
          },
        },
        process.env.ACCESS_SECRET,
        { expiresIn: '15m' }
      );
      console.log('return something');
      console.log('current access token', accessToken);
      res.json({ token: accessToken });
    })
  );
});

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.json({ msg: 'Cookie cleared' });
};

// const logout = (req, res) => {
//   const authHeader = req.headers['authorization'];
//   jwt.sign(authHeader, '', { expiresIn: 1 }, (logout, err) => {
//     if (logout) {
//       res.json({ msg: 'Logged out successfully' });
//     } else {
//       res.json({ msg: 'Error logging out' });
//     }
//   });
// };

module.exports = {
  login,
  refresh,
  logout,
};
