const UserCard = require('../db/schemas/userCardSchema');

exports.getUserCards = async (skip, limit) => {
  try {
    return await UserCard.find().skip(skip).limit(limit).sort({ _id: -1 });
  } catch (err) {
    console.log(err);
    return [];
  }
};

exports.getUserCardDetails = async (userId) => {
  try {
    return await UserCard.findById(userId);
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.addUserCard = async (cardData) => {
  try {
    return await UserCard.create(cardData);
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.deleteUserCard = async (id) => {
  try {
    return await UserCard.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return null;
  }
};

exports.updateUserCard = async (id, data) => {
  try {
    return await UserCard.findOneAndUpdate({ _id: id }, data);
  } catch (err) {
    console.log(err);
    return null;
  }
};
