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
     let member = await User.findOne({ MemberName: req.body.MemberName });
     if (!member) {
         return res.status(400).send('아이디가 존재하지 않습니다.');
     }

     // Then validate the Credentials in MongoDB match
     // those provided in the request
     const validPassword = await bcrypt.compare(req.body.MemberPassword, member.MemberPassword);
     if (!validPassword) {
         return res.status(400).send('비밀번호가 맞지 않습니다.');
     }

     res.send(true);
});


function validate(req) {
    const schema = {
        MemberName: Joi.string().min(5).max(255).required().email(),
        MemberPassword: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
