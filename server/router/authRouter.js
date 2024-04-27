const express = require('express');
const authController = require('../controllers/authController');
const { userValidatorSchema, loginValidatorSchema } = require('../validators/authValidator');
const validate = require('../middlewares/validateMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .get('/', authController.Home)
    .post('/signup',validate(userValidatorSchema), authController.Signup)
    .post('/login',validate(loginValidatorSchema), authController.Login)
    .get('/user', authMiddleware, authController.UserProfile)

module.exports = router;