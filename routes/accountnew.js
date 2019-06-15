
const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=> {
  let userName = req.body.MemberName;
  let userPassword = req.body.MemberPassword;
  let userTokenkey = req.body.userTokenkey;
  let securityKey = req.body.securityKey;

  let response = {
    "result":200,
    "message":newAccount,
    "accout": newAccount,
    "balance": balance,
    "createAt" :now
  }

  res.status(200).json(response);
  res.send('newAccount');
})

module.exports = router;
