const { v4: uuidv4 } = require('uuid')

const Publication = require('../models/publication')
const User = require('../models/user')
const Follow = require('../models/follow')
const cloudinaryUploadImg = require('../utils/cloudinayUploadImg')

const publicationController = {
  /**********************************************************
   *  Publish
   **********************************************************/
  publish: async (file, imageFeet, user) => {
    try {
      const res = await cloudinaryUploadImg(file, 'publication', uuidv4())

      const publication = new Publication({
        userId: user.id,
        imageUrl: res.secure_url,
        imageFeet,
      })
      await publication.save()

      return publication
    } catch (err) {
      console.log(err)
      return err
    }
  },

  /**********************************************************
   *  getUserPublications
   **********************************************************/
  getUserPublications: async (username) => {
    try {
      const user = await User.findOne({ username })

      if (!user) throw new Error('Usuario no encontrado')

      const publications = await Publication.find({ userId: user.id })

      return publications
    } catch (err) {
      console.log(err)
      return err
    }
  },

  /**********************************************************
   *  getPublicationsFolloweds
   **********************************************************/
  getPublicationsFolloweds: async (user) => {
    try {
      const followedsUser = await Follow.find({ userId: user.id })

      const publicationsFolloweds = []
      for await (const followed of followedsUser) {
        const publicationsFollowed = await Publication.find({
          userId: followed.follow,
        })
          .populate('userId')
          .sort({ createAt: -1 })
          .limit(5)
        publicationsFolloweds.push(...publicationsFollowed)
      }

      const result = publicationsFolloweds?.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      )

      return result
    } catch (err) {
      console.log(err)
      return err
    }
  },
}

module.exports = publicationController
