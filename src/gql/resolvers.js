const { GraphQLUpload } = require('graphql-upload')

const userController = require('../controllers/userController')
const followController = require('../controllers/followController')

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    // User ***********************************************
    getUser: (_, { username }) => userController.getUser(username),

    search: (_, { search }) => userController.search(search),

    // Follow *********************************************
    followNoFollow: (_, { username }, ctx) =>
      followController.followNoFollow(username, ctx.user),

    getFollowers: (_, { username }) => followController.getFollowers(username),

    getFolloweds: (_, { username }) => followController.getFolloweds(username),
  },

  Mutation: {
    // User ***********************************************
    createUser: (_, { input }) => userController.createUser(input),

    loginUser: (_, { input }) => userController.loginUser(input),

    avatarUpload: (_, { file }, ctx) =>
      userController.avatarUpload(file, ctx.user),

    avatarDelete: (_, {}, ctx) => userController.avatarDelete(ctx.user),

    updateUser: (_, { input }, ctx) =>
      userController.updateUser(input, ctx.user),

    updatePassword: (_, { input }, ctx) =>
      userController.updatePassword(input, ctx.user),

    // Follow *********************************************
    follow: (_, { username }, ctx) =>
      followController.follow(username, ctx.user),

    unFollow: (_, { username }, ctx) =>
      followController.unFollow(username, ctx.user),
  },
}

module.exports = resolvers
