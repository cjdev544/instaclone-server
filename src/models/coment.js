const mongoose = require('mongoose')

const Schema = mongoose.Schema

const comentSchema = Schema({
  publicationId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Publication',
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'User',
  },
  coment: {
    type: String,
    require: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Coment', comentSchema)
