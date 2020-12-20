const { mongoose } = require('../dbConfig');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  designation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('userCard', userSchema);
