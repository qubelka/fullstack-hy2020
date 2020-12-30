const { ApolloServer, gql } = require('apollo-server')
const connect = require('./connect')
const Book = require('./models/book')
const Author = require('./models/author')

// Connect to the DB
connect()

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      authorName: String!
      authorBorn: Int
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount() {
      return Book.collection.countDocuments()
    },
    authorCount() {
      return Author.collection.countDocuments()
    },
    async allBooks(root, args) {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }

      let filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author ? author._id : null
      }

      if (args.genre) filter.genres = args.genre

      return Book.find(filter).populate('author')
    },
    allAuthors() {
      return Author.find({})
    },
  },

  Mutation: {
    async addBook(root, { authorName, authorBorn = null, ...bookInfo }) {
      let author = await Author.findOne({ name: authorName })
      if (!author) {
        author = await Author.create({
          name: authorName,
          born: authorBorn,
        })
      }

      await Book.create({ ...bookInfo, author: author._id })
      return Book.findOne({ title: bookInfo.title }).populate('author')
    },
    async editAuthor(root, args) {
      const author = await Author.findOne({
        name: args.name,
      })

      if (!author) {
        return null
      }

      return Author.findByIdAndUpdate(
        author._id,
        { born: args.setBornTo },
        {
          new: true,
        }
      )
    },
  },
  Author: {
    async bookCount(root) {
      // REMOVE ON THE LAST COMMIT
      console.log('inside Author-bookCount resolver ', root)
      const author = await Author.findOne({ name: root.name })
      const booksByAuthor = await Book.find({ author: author._id })
      return booksByAuthor.length
    },
  },
  Book: {
    author(root) {
      // REMOVE ON THE LAST COMMIT
      console.log('inside Book-author resolver ', root)
      return {
        name: root.author.name,
        born: root.author.born,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
