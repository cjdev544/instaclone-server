const mongoose = require('mongoose')
const Schema = mongoose.Schema

const followSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  follow: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Follow', followSchema)
