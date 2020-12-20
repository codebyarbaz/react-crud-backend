const userModel = require('../models/userModel');
const utils = require('../utils/utils');
const constants = require('../data/constants');

exports.getUserByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    if (username) {
      const user = await userModel.getUserByUsername(username, next);

      if (user) {
        return res.json({ success: true, data: user });
      } else {
        return res.json({ success: false, data: null });
      }
    } else {
      return res.json({ success: false, data: null });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, data: null });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (name && email && password && role) {
      const details = {
        name,
        email,
        password,
        role
      };

      details.email = details.email.toLowerCase();
      details.password = await utils.hashPassword(details.password, next);

      const user = await userModel.createUser(details, next);
      if (user.status === 201) {
        console.log('New user account created!', user);
        return res.json({ success: true, data: user.user });
      } else {
        const errorMsgs = utils.parseErrorMsg(user.err);
        return res.json({ success: false, msg: errorMsgs[0] });
      }
    } else {
      return res.json({ success: false, msg: 'Params missing!' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
