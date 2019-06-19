const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Member } = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

     const { error } = validate(req.body);
     if (error) {
         let response = {
             "result":400,
             "message":"입력값을 확인하세요." 
         }
         return res.status(200).json(response);
     }

     //  멤버가 존재하는지,
     let member = await Member.findOne({ userName: req.body.userName });
     if (!member) {
         let response = {
             "result":400,
             "message":"아이디가 존재하지 않습니다."
         }
         return res.status(200).json(response);
     }

     // 망고디비와 비교.
     const validPassword = await bcrypt.compare(req.body.userPassword, member.userPassword);
     if (!validPassword) {
         let response = {
             "result":400,
             "message":"비밀번호가 맞지 않습니다."
         }
         return res.status(200).json(response);
     }

     let response = {
       "result":200,
       "message":'로그인 되었습니다.'
     }

     res.status(200).json(response);
});


function validate(req) {
    const schema = {
        userName: Joi.string().min(5).max(255).required().email(),
        userPassword: Joi.string().min(5).max(255).required(),
        securityKey: "Haveagoodday"
    };

    return Joi.validate(req, schema);
}

module.exports = router;
