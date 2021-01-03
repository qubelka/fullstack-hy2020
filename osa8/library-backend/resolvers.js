const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const JWT_SECRET = 'secret'
const pubSub = new PubSub()
const BOOK_ADDED = 'BOOK_ADDED'

module.exports = {
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
    me(root, args, context) {
      return context.currentUser
    },
  },

  Mutation: {
    async addBook(
      root,
      { authorName, authorBorn = null, ...bookInfo },
      { currentUser }
    ) {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: authorName })
      if (!author) {
        try {
          author = await Author.create({
            name: authorName,
            born: authorBorn,
            bookCount: 1,
          })
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: { authorName, authorBorn },
          })
        }
      } else {
        author.bookCount = author.bookCount + 1
        await author.save()
      }

      try {
        await Book.create({ ...bookInfo, author: author._id })
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: bookInfo })
      }

      const book = Book.findOne({ title: bookInfo.title }).populate('author')
      pubSub.publish(BOOK_ADDED, { bookAdded: book })

      return book
    },
    async editAuthor(root, args, { currentUser }) {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
    async createUser(root, args) {
      try {
        const user = await User.create({ ...args })
        return user
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    async login(root, args) {
      const user = await User.findOne({ username: args.username })

      if (user && args.password === 'secret') {
        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }

      throw new UserInputError('wrong credentials')
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator([BOOK_ADDED]),
    },
  },
}
