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

  # Types Publication *************************************
  type Publication {
    id: ID
    userId: ID
    imageUrl: String
    imageFeet: String
    createAt: String
  }

  type HomePunblication {
    id: ID
    userId: User
    imageUrl: String
    imageFeet: String
    createAt: String
  }

  # Types coment ******************************************
  type Coment {
    id: ID
    publicationId: ID
    userId: ID
    coment: String
    createAt: String
  }

  type ComentUser {
    id: ID
    user: User
    coment: String
    createAt: String
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

  # Imputs coment *****************************************
  input ComentInput {
    publicationId: ID!
    coment: String!
  }

  # *******************************************************
  # QUERIES
  # *******************************************************

  type Query {
    # User ************************************************
    getUser(username: String, id: ID): User
    search(search: String!): [User]

    # Follow **********************************************
    followNoFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFolloweds(username: String!): [User]
    getNoFolloweds: [User]

    # Publication *****************************************
    getUserPublications(username: String!): [Publication]
    getPublicationsFolloweds: [HomePunblication]

    # Coment **********************************************
    getComentsPublication(publicationId: ID!): [ComentUser]

    # Like ************************************************
    isLike(publicationId: ID!): Boolean
    countLike(publicationId: ID!): Int
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

    # Follow **********************************************
    follow(username: String!): Boolean
    unFollow(username: String!): Boolean

    # Publication *****************************************
    publish(file: Upload!, imageFeet: String): Publication

    # Coment **********************************************
    addComent(input: ComentInput): Coment

    # Like ************************************************
    addLike(publicationId: ID!): Boolean
    removeLike(publicationId: ID!): Boolean
  }
`

module.exports = typeDefs
