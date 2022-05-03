const Coment = require('../models/coment')
const Publication = require('../models/publication')
const User = require('../models/user')

const comentController = {
  addComent: async (input, user) => {
    try {
      const { publicationId, coment } = input

      const publicationExist = await Publication.findById(publicationId)

      if (!publicationExist) throw new Error('Publicación no encontrada')

      const comentData = {
        publicationId,
        userId: user.id,
        coment,
      }
      const newComent = new Coment(comentData)
      await newComent.save()
      return newComent
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getComentsPublication: async (publicationId) => {
    try {
      const publication = await Publication.findById(publicationId)

      if (!publication) throw new Error('Publicación no encontrada')

      const coments = await Coment.find({ publicationId })

      const comentAndUser = []
      for await (const coment of coments) {
        const user = await User.findById(coment.userId)
        comentAndUser.push({
          id: coment.id,
          coment: coment.coment,
          user,
          createAt: coment.createAt,
        })
      }

      return comentAndUser
    } catch (err) {
      console.log(err)
      return err
    }
  },
}

module.exports = comentController
