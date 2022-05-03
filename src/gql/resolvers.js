const { GraphQLUpload } = require('graphql-upload')

const userController = require('../controllers/userController')
const followController = require('../controllers/followController')
const publicationController = require('../controllers/publicationController')
const comentController = require('../controllers/comentController')
const likeController = require('../controllers/likeController')

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    // User ***********************************************
    getUser: (_, { username, id }) => userController.getUser(username, id),

    search: (_, { search }) => userController.search(search),

    // Follow *********************************************
    followNoFollow: (_, { username }, ctx) =>
      followController.followNoFollow(username, ctx.user),

    getFollowers: (_, { username }) => followController.getFollowers(username),

    getFolloweds: (_, { username }) => followController.getFolloweds(username),

    getNoFolloweds: (_, {}, ctx) => followController.getNoFolloweds(ctx.user),

    // Publication ****************************************
    getUserPublications: (_, { username }) =>
      publicationController.getUserPublications(username),

    getPublicationsFolloweds: (_, {}, ctx) =>
      publicationController.getPublicationsFolloweds(ctx.user),

    // Coment *********************************************
    getComentsPublication: (_, { publicationId }) =>
      comentController.getComentsPublication(publicationId),

    // Like ***********************************************
    isLike: (_, { publicationId }, ctx) =>
      likeController.isLike(publicationId, ctx.user),

    countLike: (_, { publicationId }) =>
      likeController.countLike(publicationId),
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

    // Publication ****************************************
    publish: (_, { file, imageFeet }, ctx) =>
      publicationController.publish(file, imageFeet, ctx.user),

    // Coment *********************************************
    addComent: (_, { input }, ctx) =>
      comentController.addComent(input, ctx.user),

    // Like ***********************************************
    addLike: (_, { publicationId }, ctx) =>
      likeController.addLike(publicationId, ctx.user),

    removeLike: (_, { publicationId }, ctx) =>
      likeController.removeLike(publicationId, ctx.user),
  },
}

module.exports = resolvers
