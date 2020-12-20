const cardModel = require('../models/cardModel');
const userImages = require('../data/userImages');
const { getRandomNumber } = require('../utils/utils');

exports.getUserCards = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = 100;
    const users = await cardModel.getUserCards(skip, limit);
    return res.json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, data: null });
  }
};

exports.getUserCardDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const user = await cardModel.getUserCardDetails(userId);
      if (user) {
        return res.json({ success: true, data: user });
      } else {
        return res.json({ success: true, data: null, msg: 'User not found' });
      }
    } else {
      return res.json({ success: false, data: null, msg: 'Params missing' });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      data: null,
      msg: 'Something went wrong'
    });
  }
};

exports.addUserCard = async (req, res, next) => {
  try {
    const { name, designation } = req.body;
    if (name && designation) {
      const card = { name, designation };
      card.image = `${process.env.DOMAIN}${
        userImages[getRandomNumber(0, userImages.length - 1)]
      }`;
      const result = await cardModel.addUserCard(card);
      if (result) {
        return res.json({ success: true, data: result, msg: 'Success' });
      } else {
        return res.json({
          success: false,
          data: null,
          msg: 'Unable to add user card'
        });
      }
    } else {
      return res.json({ success: false, data: null, msg: 'Params missing' });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      data: null,
      msg: 'Something went wrong'
    });
  }
};

exports.deleteUserCard = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const result = await cardModel.deleteUserCard(userId);
      if (result) {
        return res.json({ success: true, msg: 'User deleted' });
      } else {
        return res.json({ success: false, msg: 'User not found' });
      }
    } else {
      return res.json({ success: false, msg: 'Params missing' });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: 'Something went wrong' });
  }
};

exports.updateUserCard = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const { name, designation } = req.body;
      if (name && designation) {
        const result = await cardModel.updateUserCard(userId, {
          name,
          designation
        });
        if (result) {
          return res.json({ success: true, msg: 'User updated' });
        } else {
          return res.json({ success: false, msg: 'User not found' });
        }
      } else {
        return res.json({ success: false, msg: 'Params missing' });
      }
    } else {
      return res.json({ success: false, msg: 'Params missing' });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: 'Something went wrong' });
  }
};
