const bcrypt = require('bcrypt');
const _ = require('lodash');
const { Member, validate } = require('../models/member');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    let member = await Member.findOne({ MemberName: req.body.MemberName });
    // 멤버 이름이 중복되지 않게 합니다.
    if (member) {
        return res.status(400).send('이미 존재하는 아이디입니다!');
    }
    // 중복이 아니라면 회원가입을 합니다.
    else {

        member = new Member(_.pick(req.body, ['MemberName', 'MemberPassword']));
        const salt = await bcrypt.genSalt(10);
       member.MemberPassword = await bcrypt.hash(member.MemberPassword, salt);
        await member.save();
        //res.send(_.pick(member, ['MemberName']));

        let response = {
          "result":200,
          "createAt" :now,
          "userTokenKey":""
        }

        res.status(200).json(response);
        res.send('계정이 생성됬습니다')
    }
});

module.exports = router;
