const express = require('express');
const { set } = require('mongoose');
const registerationRouter = express.Router()
const register = require('../model/Registartiondata')
const bcryptjs = require('bcryptjs')

registerationRouter.post('/', async (req, res) => {
  console.log("haaai");

  try {
    const olduser = await register.findOne({ Email: req.body.email })
    if (olduser) {
      return res.status(400).json({
        message: "email already exist",
        success: false,
      })
    }
    const oldphone = await register.findOne({ Phonenumber: req.body.phone_number })
    if (oldphone) {
      return res.status(400).json({
        message: "phonenumber already exist",
        success: false,
      })
    }
    const hasedpassword = await bcryptjs.hash(req.body.password, 10)
    var registerdata = {
      Ufirstname: req.body.firstname,
      Ulasrname: req.body.lastname,
      Email: req.body.email,
      Phonenumber: req.body.phone_number,
      password: hasedpassword,
      roll:1,
    }
    const result = await register(registerdata).save()
    if (result) {
      return res.status(200).json({
        values: result,
        message: "registeration completed",
        success: true,
        error: false
      })
    } else {
      return res.status(400).json({
        message: "something went wrong",
        success: false,
      })
    }

  } catch {
    return res.status(400).json({
      message: "something went wrong",
      success: false,
    })

  }


})

registerationRouter.get('/view_alluser', (req, res) => {
  register.find().then((users) => {
    res.status(200).json({
      values: users,
      message: "get all users",
      success: true,
      error: false
    })
  }).catch((error) => {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  })

})

registerationRouter.get('/view_singelUser/:Uid', (req, res) => {

  const id = req.params.Uid
  register.findOne({ _id: id }).then((data) => {
    res.status(200).json({
      values: data,
      message: "get selected user",
      success: true,
      error: false
    })
  }).catch((error) => {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  })
})

registerationRouter.delete('/delete_oneuser', (req, res) => {
  const id = req.body.Uid
  register.deleteOne({ _id: id }).then((userdata) => {
    res.status(200).json({
      values: userdata,
      message: "selected user deleter successfully",
      success: true,
      error: false
    })
  }).catch((error) => {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  })
})

registerationRouter.delete('/delete_all_user', (req, res) => {
  register.remove().then((users) => {
    res.status(200).json({
      values: users,
      message: "selected user deleter successfully",
      success: true,
      error: false
    })
  }).catch((error) => {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  })
})

registerationRouter.post('/update', (req, res) => {
  const id = req.body.id
  var registerdata = {
    Ufirstname: req.body.firstname,
    Ulasrname: req.body.lastname,
    Email: req.body.email,
    Phonenumber: req.body.phone_number,
    password: req.body.password,
  }
  register.updateOne({ _id: id }, { $set: registerdata }).then((updateuser) => {
    res.status(200).json({
      values: updateuser,
      message: "update sucessfully",
      success: true,
      error: false
    })
  }).catch((error) => {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
      success: false,
    })
  })
})

module.exports = registerationRouter;
2