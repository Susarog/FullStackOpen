const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI =
  'mongodb+srv://fullstack:AUe04i4ABXn2bkPm@cluster0.xgrzjsy.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

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
          { genres: { $in: [args.genres] } },
          { author: { $in: [authorObj._id] } }
        ).populate('author', { name: 1, born: 1, id: 1 })
      } else if (args.genre) {
        return Book.find({ genres: { $in: [args.genres] } }).populate(
          'author',
          { name: 1, born: 1, id: 1 }
        )
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
      user = new User({ username: args.username })
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
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
