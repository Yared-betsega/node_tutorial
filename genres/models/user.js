
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
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
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin}, process.env['jwtPrivateKey']);
    return token
}


const User = mongoose.model('User', userSchema);

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
