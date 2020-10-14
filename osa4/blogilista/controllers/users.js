const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  const password = body.password

  if (!password || password.length < 3) {
    const err = new Error('user should have a password of minimum 3 characters in length')
    err.name = 'ValidationError'
    err.status = 400
    return next(err)
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const createdUser = await newUser.save()
  if (createdUser) {
    response.status(201).json(createdUser)
  } else {
    response.status(400).end()
  }

})

module.exports = usersRouter