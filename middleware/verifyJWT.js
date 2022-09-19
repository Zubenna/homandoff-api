const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Accesstoken expired 401');
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Forbidden' });
    req.user = decoded.UserInfo.username;
    req.isAdmin = decoded.UserInfo.isAdmin;
    // console.log('verifyJWT is working');
    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  console.log('token', token);
  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: 'Forbidden' });
    if (decoded.UserInfo.isAdmin) {
      req.user = decoded.UserInfo.username;
      req.isAdmin = decoded.UserInfo.isAdmin;
      console.log(req.isAdmin);
      next();
    }
  });
};

module.exports = { verifyJWT, verifyTokenAndAdmin };
