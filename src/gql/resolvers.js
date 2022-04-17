const userController = require('../controllers/userController')

const resolvers = {
  Query: {
    getUser: (_, { username }) => userController.getUser(username),
  },

  Mutation: {
    createUser: (_, { input }) => userController.registerUser(input),

    loginUser: (_, { input }) => userController.loginUser(input),

    updateAvatar: (_, { file }) => userController.updateAvatar(file),
  },
}

module.exports = resolvers
