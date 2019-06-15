const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=> {
  let account = req.body.accout;
  let userPassword = req.body.MemberPassword;
  let securityKey = req.body.securityKey;

  let response = {
    "result":200,
    "accout":"",
    "userCoin":"",
    "message" : '잔액을 조회했습니다.'
  }

  res.status(200).json(response);

})
module.exports = router;
