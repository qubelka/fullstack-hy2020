const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const connect = require('./connect')
const User = require('./models/user')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const JWT_SECRET = 'secret'

// Connect to the DB
connect()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
