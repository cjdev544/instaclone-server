const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')
const jwt = require('jsonwebtoken')

const dbConfig = require('./db')
const typeDefs = require('./gql/schemas')
const resolvers = require('./gql/resolvers')

require('dotenv').config()

dbConfig()

const PORT = process.env.PORT || 4000

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization

      if (token) {
        try {
          const user = jwt.verify(token.split(' ')[1], process.env.SECRET_WORD)

          return { user }
        } catch (err) {
          return
        }
      }
    },
  })

  await server.start()

  const app = express()

  app.use(graphqlUploadExpress())

  server.applyMiddleware({ app })

  await new Promise((r) => app.listen({ port: PORT }, r))

  console.log(`🚀 Server ready at ${PORT}${server.graphqlPath}`)
}

startServer()
