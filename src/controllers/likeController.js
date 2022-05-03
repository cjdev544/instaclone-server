const Like = require('../models/like')
const Publication = require('../models/publication')

const likeController = {
  addLike: async (publicationId, user) => {
    try {
      const publicationExist = await Publication.findById(publicationId)

      if (!publicationExist) throw new Error('Publicación no encontrada')

      const newLike = new Like({
        publicationId,
        userId: user.id,
      })
      await newLike.save()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },

  removeLike: async (publicationId, user) => {
    try {
      const publicationExist = await Publication.findById(publicationId)

      if (!publicationExist) throw new Error('Publicación no encontrada')

      await Like.findOneAndDelete({ publicationId }).where({ userId: user.id })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },

  isLike: async (publicationId, user) => {
    try {
      const publicationExist = await Publication.findById(publicationId)

      if (!publicationExist) throw new Error('Publicación no encontrada')

      const isLike = await Like.findOne({ publicationId }).where({
        userId: user.id,
      })

      if (isLike) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return err
    }
  },

  countLike: async (publicationId) => {
    try {
      const publicationExist = await Publication.findById(publicationId)

      if (!publicationExist) throw new Error('Publicación no encontrada')

      const countLike = await Like.countDocuments({ publicationId })
      return countLike
    } catch (err) {
      console.log(err)
      return err
    }
  },
}

module.exports = likeController
