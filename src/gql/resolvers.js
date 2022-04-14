const userController = require('../controllers/userController')

const resolvers = {
  Query: {
    getUser: () => console.log('usuarios'),
  },

  Mutation: {
    createUser: (_, { input }) => userController.registerUser(input),

    loginUser: (_, { input }) => userController.loginUser(input),
  },
}

module.exports = resolvers
