const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Member } = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

     const { error } = validate(req.body);
     if (error) {
         return res.status(400).send(error.details[0].message);
     }

     //  멤버가 존재하는지,
     let member = await Member.findOne({ MemberName: req.body.MemberName });
     if (!member) {
         return res.status(400).send('아이디가 존재하지 않습니다.');
     }

     // 망고디비와 비교.
     const validPassword = await bcrypt.compare(req.body.MemberPassword, member.MemberPassword);
     if (!validPassword) {
         return res.status(400).send('비밀번호가 맞지 않습니다.');
     }
     let response = {
       "result":200
     }

     res.status(200).json(response);
     res.send('로그인 되었습니다.');
});


function validate(req) {
    const schema = {
        MemberName: Joi.string().min(5).max(255).required().email(),
        MemberPassword: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
