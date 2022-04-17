const { gql } = require('apollo-server')

const typeDefs = gql`
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
    status: Boolean
    urlAvatar: String
  }

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

  type Query {
    # User
    getUser(username: String!): User
  }

  type Mutation {
    # User
    createUser(input: UserInput): User
    loginUser(input: LoginInput): Token
    updateAvatar(file: Upload): UpdateAvatar
  }
`

module.exports = typeDefs
