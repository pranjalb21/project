const Contact = require("../models/contactModel")

const postContact = async (req,res)=>{
    try {
        const {name,email,message} = req.body
        const result = await Contact.create({name,email,message});
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(`Server error`);
    }
}

module.exports = postContact