const express = require('express')
const loginRouter = express.Router()
const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')


const login = require('../model/logindata')
const register = require('../model/Registartiondata')

loginRouter.post('/', async (req, res) => {

  try {
    const oldemail = await register.findOne({ Email: req.body.username })
    console.log(req.body.username)
    if (!oldemail)
      return res.status(400).json({
        message: "user desnot exist"
      })


    var pass = req.body.password
    const isPasswordCorrect = await bcr.compare(pass, oldemail.password)
    console.log("abc ", isPasswordCorrect);
    console.log(req.body.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password incorrect"
      })
    }
    else {
      const token = jwt.sign({ username: oldemail.Ufirstname, userId: oldemail._id, email: oldemail.Email,userRoll:oldemail.roll },
        "secret",
        {expiresIn:'3h'}
        )
      return res.status(200).json({
        values: oldemail,
        message: 'login success',
        success: true,
        error: false,
        token:token,
      })
    }


  } catch {
    return res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  }

})













module.exports = loginRouter