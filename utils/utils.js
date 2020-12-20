const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const saltRounds = 10;

exports.hashPassword = async (plainPassword, next) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (err) {
    next(err);
  }
};

exports.verifyPassword = async (plainPassword, hashPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (err) {
    return null;
  }
};

exports.errorParser = async (err) => {
  try {
    const errors = [];
    if (err.code === 11000) {
      const path = Object.keys(err.keyValue)[0];
      errors.push({
        path: path,
        type: 'unique'
      });

      return errors;
    }

    if (err.errors) {
      const errs = Object.values(err.errors);
      errs.forEach((e) => {
        errors.push({
          path: e.properties.path,
          type: e.properties.type
        });
      });
    }

    return errors;
  } catch (err) {
    console.log(err);
  }
};

exports.generateJWT = async (data) => {
  try {
    return JWT.sign(data, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 3 // 3 Days
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.decodeToken = async (token) => {
  try {
    if (token) {
      return JWT.verify(token, process.env.JWT_SECRET_KEY);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.parseErrorMsg = (errors) => {
  const msgs = [];

  errors.forEach((err) => {
    if (err.type === 'unique') {
      msgs.push(`${err.path} already taken!`);
    } else if (err.type === 'required') {
      msgs.push(`${err.path} is required!`);
    }
  });

  return msgs;
};
