const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('User', userSchema)
