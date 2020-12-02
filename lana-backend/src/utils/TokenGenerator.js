const { jwtSecret } = require('../config/AppConfig');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const TokenGenerator = module.exports;

//data will be a guid
TokenGenerator.generateSignedToken = () => {
  const id = uuidv4();
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: id
  }, jwtSecret);

  return { token, id };
}

TokenGenerator.verifySignedToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded) {
      return decoded.data;
    } else {
      throw new Error(err);
    }
  } catch(err) {
    throw new Error(err);
  }
}