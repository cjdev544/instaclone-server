const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likeSchema = Schema({
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
})

module.exports = mongoose.model('Like', likeSchema)
