const { gql } = require('apollo-server')

const typeDefs = gql`
  # *******************************************************
  # TYPES
  # *******************************************************

  scalar Upload # Upload files type scalar
  # Types User ********************************************
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    id: ID
    name: String
    username: String
    email: String
    avatar: String
    website: String
    description: String
    createAt: String
  }

  type Token {
    token: String
  }

  type UpdateAvatar {
    ok: Boolean
    urlAvatar: String
  }

  # *******************************************************
  # INPUTS
  # *******************************************************

  # Inputs User *******************************************
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateInput {
    valueToChange: String!
    newValue: String!
  }

  input UpdatePassword {
    lastPassword: String!
    newPassword: String!
  }

  # *******************************************************
  # QUERYS
  # *******************************************************

  type Query {
    # User ************************************************
    getUser(username: String!): User
    search(search: String!): [User]

    # Follow **********************************************
    followNoFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]
  }

  # *******************************************************
  # MUTATIONS
  # *******************************************************

  type Mutation {
    # User ************************************************
    createUser(input: UserInput): User
    loginUser(input: LoginInput): Token
    avatarUpload(file: Upload!): UpdateAvatar
    avatarDelete: Boolean
    updateUser(input: UpdateInput): User
    updatePassword(input: UpdatePassword): Boolean

    # Follow
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean
  }
`

module.exports = typeDefs
