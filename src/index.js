const { ApolloServer } = require('apollo-server')
const dbConfig = require('./db')
const typeDefs = require('./gql/schemas')
const resolvers = require('./gql/resolvers')

require('dotenv').config()

dbConfig()

const server = new ApolloServer({ typeDefs, resolvers })

server
  .listen()
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  .catch(() => console.log('Error en servidor'))
