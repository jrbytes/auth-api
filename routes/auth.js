const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../model/UserValidation')

router.post('/register', async (req, res) => {
  //lets validate the data before we a user
  const {error} = registerValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // checking if the is already in the database
  const emailExist = await User.findOne({email: req.body.email})
  if(emailExist) return res.status(400).send('Usuário cadastrado.')

  //hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await user.save()
    res.send({user: user._id})
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  //lets validate the data before we a user
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  // checking if the email exists
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).send('E-mail ou senha incorreto.')

  // checking if the password invalid
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('E-mail ou senha incorreto.')

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router