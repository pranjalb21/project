const express = require('express');
const postContact = require('../controllers/contactController');
const validate = require('../middlewares/validateMiddleware');
const contactValidatorSchema = require('../validators/contactValidator');

const router = express.Router();

router 
    .post('/', validate(contactValidatorSchema), postContact);

module.exports = router;