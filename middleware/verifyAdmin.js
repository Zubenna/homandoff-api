// const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];

//   jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Forbidden' });
//     req.user = decoded.UserInfo.username;
//     req.roles = decoded.UserInfo.roles;
//     next();
//   });
// };


// const verifyTokenAndAdmin = (req, res, next) => {
//   verifyJWT(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).send('You are not alowed to do that!');
//     }
//   });
// };

// module.exports = verifyJWT;
