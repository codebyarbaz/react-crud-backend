const userModel = require('../models/userModel');
const utils = require('../utils/utils');
const constants = require('../data/constants');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userEmail = email.toLowerCase();
      const user = await userModel.getUserByEmail(userEmail);
      if (user) {
        const isValid = await utils.verifyPassword(password, user.password);
        if (isValid === true) {
          const jwt = await utils.generateJWT({
            id: user._id,
            name: user.name,
            image: user.image,
            role: user.role
          });

          return res.json({ success: true, token: jwt });
        } else {
          return res.json({
            success: false,
            msg: 'Email or password is incorrect!'
          });
        }
      } else {
        return res.json({
          success: false,
          msg: 'Email or password is incorrect!'
        });
      }
    } else {
      return res.json({
        success: false,
        msg: 'Invalid login details!'
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.isAdmin = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    const tokenData = await utils.decodeToken(token);
    if (tokenData && tokenData.role === constants.USER_ROLES.ADMIN) {
      next();
    } else {
      return res.json({ status: 401, success: false, msg: 'Not authorised!' });
    }
  } else {
    return res.json({ status: 404, success: false, msg: 'Token not found!' });
  }
};
