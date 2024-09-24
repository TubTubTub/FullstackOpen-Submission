const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        return Book.find({ author: author.id })
      }

      if (!args.author && args.genre) {
        return Book.find({ genres: args.genre })
      }

      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        return Book.find({ author: author.id, genres: args.genre })
      }
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        let author = await Author.findOneAndUpdate({ name: args.author }, { $inc: { bookCount: 1 } }, { new: true })

        if (!author) {
          const newAuthor = new Author({ name: args.author, bookCount: 1 })
          author = await newAuthor.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: [args.title, args.author, error]
            }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Saving author edit failed', {
            extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: [args.name, args.born, error]
            }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: [args.username, error]
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET )}
    }
  },
  Author: {
    name: (root) => root.name
  },
  Book: {
    author: async (root, args) => {
      const author = await Author.findById(root.author)
      return author
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers