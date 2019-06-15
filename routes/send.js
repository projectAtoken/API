const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=> {

  let userFrom = req.body.userFrom;
  let userTo = req.body.userTo;
  let userPassword = req.body.MemberPassword;
  let userCoin =req.body.userCoin;
  let userTokenKey=req.body.userTokenKey;
  let securityKey =req.body.securityKey;

  /*
    이체 시키는 코드.
  */

  let response = {
    "result":200,
    "message":"성공적으로 송금이 완료 됬습니다.",
    "sendAt" :now,
    "Tax":tax
  }

  res.status(200).json(response);

})

module.exports = router;
