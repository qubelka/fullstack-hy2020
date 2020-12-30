const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost:27017/library'

const connect = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch(error => {
      console.log('error connection to MongoDB', error.message)
    })
}

module.exports = connect
