const { mongoose } = require('../dbConfig');

const constants = require('../../data/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: constants.USER_ROLES.USER
  }
});

module.exports = mongoose.model('user', userSchema);
