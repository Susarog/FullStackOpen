const { UserInputError, AuthenticationError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => {
      return Book.collection.countDocuments()
    },
    authorCount: async () => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const authorObj = await Author.findOne({ name: args.author })
      if (!authorObj && args.author) {
        throw new UserInputError('Author not found')
      } else if (args.author && args.genre) {
        return Book.find(
          { genres: { $in: [args.genre] } },
          { author: { $in: [authorObj._id] } }
        ).populate('author', { name: 1, born: 1, id: 1 })
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author', {
          name: 1,
          born: 1,
          id: 1,
        })
      } else if (args.author) {
        return Book.find({ author: { $in: [authorObj._id] } }).populate(
          'author',
          {
            name: 1,
            born: 1,
            id: 1,
          }
        )
      }
      return Book.find({}).populate('author', { name: 1, born: 1, id: 1 })
    },
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      const val = await Book.countDocuments({ author: { $in: [root._id] } })
      return val
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          born: null,
        })
      }
      const book = new Book({ ...args, author })
      try {
        await author.save()
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args.author,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (author === null) {
        throw new UserInputError('Not an author', {
          invalidArgs: args.name,
        })
      }
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      let user = await User.findOne({ username: args.username })
      if (user) {
        throw new UserInputError('username taken')
      }
      user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
        favouriteGenre: user.favouriteGenre,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator('BOOK_ADDED') },
  },
}

module.exports = resolvers
