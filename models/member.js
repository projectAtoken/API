const Joi = require('joi');
const mongoose = require('mongoose');

const Member = mongoose.model('Member', new mongoose.Schema({
    MemberName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },

    MemberPassword: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateMember(member) {
    const schema = {
        MemberName: Joi.string().min(5).max(50).required().email(),
        MemberPassword: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
