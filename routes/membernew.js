const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Member, validate } = require('../models/member');
const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const now = new Date();

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    let member = await Member.findOne({ userName: req.body.userName });
    // 멤버 이름이 중복되지 않게 합니다.
    if (member) {
        let response = {
            "result":400,
            "message":"이미 존재하는 아이디입니다."
        }

        return res.status(200).json(response);
    }
    // 중복이 아니라면 회원가입을 합니다.
    else {

        member = new Member(_.pick(req.body, ['userName', 'userPassword']));
        const salt = await bcrypt.genSalt(10);
       member.userPassword = await bcrypt.hash(member.userPassword, salt);
        await member.save();
        //res.send(_.pick(member, ['MemberName']));

        let response = {
          "result":200,
          "message":"New ID",    
          "createAt" : now,
          "userName":  req.body.userName, 
          "userTokenKey":""
        }

        res.status(200).json(response);
        res.send('계정이 생성됬습니다')
    }
});

module.exports = router;
