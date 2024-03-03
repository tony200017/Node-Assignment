const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  //console.log(authHeader);
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    return res.send(error.message);
  }
  const token = authHeader.split(' ')[1];
  //console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'randomstring');
  } catch (err) {
    err.statusCode = 500;
    return res.send(err.message);
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    return res.send(error.message);;
  }
  req.userId = decodedToken.userId;
  next();
};