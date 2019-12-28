const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../model/User')

router.get('/', verify, async (req, res) => {
  console.log(req.user._id)

  try {
    const user = await User.findById({_id: req.user._id})
    res.send({
      nome: user.name,
      email: user.email
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router