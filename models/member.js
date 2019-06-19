//멤버에 대한 지정
const Joi = require('joi');
const mongoose = require('mongoose');

const Member = mongoose.model('Member', new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },

    userPassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateMember(member) {
    const schema = {
        userName: Joi.string().min(5).max(50).required().email(),
        userPassword: Joi.string().min(5).max(255).required(),
        securityKey: "Haveagoodday"

    };
    return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
