const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=> {
  let account = req.body.account;
  let userPassword = req.body.MemberPassword;
  let securityKey = req.body.securityKey;

  let response = {
    "result":200,
    "userFrom":"",
    "userTo": "",
    "userCoin":"" ,
    "sendAt" :"",
    "Tax":""
  }

  res.status(200).json(response);
  res.send('이체내역을 조회했습니다.');
})
module.exports = router;
