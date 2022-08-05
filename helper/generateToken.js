// const jwt = require('jsonwebtoken');

// const generateToken = (res, id, email) => {
//   const expiration = '2h';
//   const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
//     expiresIn: '1hr',
//   });
//   // console.log('Token', token);
//   return res.cookie('token', token, {
//     expires: new Date(Date.now() + expiration),
//     secure: false,
//     httpOnly: true,
//   });
// };
