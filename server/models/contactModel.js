const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {type: String, required:[true, `Name is required.`]},
    email: {type:String,required:[true,`Email is required`]},
    message:{type:String,required:[true,`Message can't be empty.`]}
})

const Contact = mongoose.model('Contact',contactSchema);
module.exports = Contact;