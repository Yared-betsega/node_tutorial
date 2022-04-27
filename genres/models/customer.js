const Joi = require('joi');
const mongoose = require("mongoose");

const Customer = mongoose.model('Customer', mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    }
}));

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(20).required(),
        isGold: Joi.boolean(), 
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer; 