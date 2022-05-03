const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicationSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
    trim: true,
  },
  imageFeet: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Publication', publicationSchema)
