const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength:255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser; 
