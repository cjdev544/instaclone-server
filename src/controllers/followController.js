const Follow = require('../models/follow')
const User = require('../models/user')

const followController = {
  follow: async (username, user) => {
    try {
      const newFollowId = await User.findOne({ username })

      if (!newFollowId) throw new Error('Usuario no encontrado')

      const newFollow = new Follow({
        userId: user.id,
        follow: newFollowId.id,
      })

      await newFollow.save()

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },

  followNoFollow: async (username, user) => {
    try {
      const usernameId = await User.findOne({ username })

      if (!usernameId) throw new Error('Usuario no encontrado')

      const follow = await Follow.find({ userId: user.id })
        .where('follow')
        .equals(usernameId.id)

      if (follow?.length) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return err
    }
  },

  unFollow: async (username, user) => {
    try {
      const usernameId = await User.findOne({ username })

      if (!usernameId) throw new Error('Usuario no encontrado')

      const follow = await Follow.find({ userId: user.id })
        .where('follow')
        .equals(usernameId.id)

      if (!follow?.length) {
        return false
      }
      await Follow.findByIdAndDelete(follow[0].id)
      return true
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getFollowers: async (username) => {
    try {
      const user = await User.findOne({ username })

      if (!user) throw new Error('Usuario no encontrado')

      const followers = await Follow.find({ follow: user.id }).populate(
        'userId'
      )

      const followersFormat = followers?.map((follower) => ({
        id: follower.userId.id,
        name: follower.userId.name,
        username: follower.userId.username,
        avatar: follower.userId.avatar,
      }))

      return followersFormat
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getFolloweds: async (username) => {
    try {
      const user = await User.findOne({ username })

      if (!user) throw new Error('Usuario no encontrado')

      const followeds = await Follow.find({ userId: user.id }).populate(
        'follow'
      )

      const followedsFormat = followeds?.map((followed) => ({
        id: followed.follow.id,
        name: followed.follow.name,
        username: followed.follow.username,
        avatar: followed.follow.avatar,
      }))

      return followedsFormat
    } catch (err) {
      console.log(err)
      return err
    }
  },

  getNoFolloweds: async (user) => {
    try {
      const users = await User.find().limit(100)

      const arrayUsers = []
      for await (const userFind of users) {
        const isNoFollowed = await Follow.findOne({ userId: user.id })
          .where('follow')
          .equals(userFind.id)

        if (!isNoFollowed) {
          if (user.id.toString() !== userFind.id.toString()) {
            arrayUsers.push(userFind)
          }
        }
      }
      return arrayUsers
    } catch (err) {
      console.log(err)
      return err
    }
  },
}

module.exports = followController
