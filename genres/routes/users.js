const express = require("express")
const mongoose = require("mongoose");
const {User, validate} = require("../models/user")

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

    let user = User({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    
    });

    await user.save();
    res.send(user);
});

module.exports = router;
