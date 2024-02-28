const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Config/config.js');

const generateToken = (user) => {
  const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports.auth = {
  hashPassword,
  comparePasswords,
  generateToken
};
