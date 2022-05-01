const express = require("express")
const mongoose = require("mongoose");
const {User, validate} = require("../models/user")
const _ = require('lodash');
const bcrypt = require("bcrypt");



const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort();
    res.send(users); 
});

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("A user with the given Id was not found");
    res.send(user);
});

router.post("/", async(req, res) => {
    
    const{ error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let userWithGivenemail = await User.findOne({email: req.body.email});
    if (userWithGivenemail) return res.status(400).send('User already registered');

    let user = User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));
});

module.exports = router;
