const express = require("express");
const { boolean } = require("joi");
const {Customer, validate} = require("../models/customer")
const mongoose = require("mongoose");
const auth = require('../middleware/auth')

const router = express.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("A customer with the given Id was not found");
    res.send(customer);
})

router.post("/", auth, async(req, res) => {
    
    const{ error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = Customer({ 
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
})

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        { 
            name: req.body.name,
            phone: req.body.name,
            isGold: req.body.isGold 
        }, 
        { new: true});

    if (!customer) return res.status(404).send("A customer with the given Id was not found");
    
    res.send(customer);
 
})

router.delete("/:id", auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

module.exports = router;