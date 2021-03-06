const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  let passwordCorrect

  if (user === null) {
    passwordCorrect = false
  } else {
    passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
  }

  if(!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter