const Joi = require('joi');
const mongoose = require("mongoose");
const {Genre} = require('./genre')

const Movie = mongoose.model('Movie', mongoose.Schema({
    title: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: Genre,
    numberInStock: Number,
    dailyRentalRate: Number
}));

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        genre: Joi.object(Genre),
        numberInStock: Joi.number(), 
        dailyRentalRate: Joi.number()
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie; 