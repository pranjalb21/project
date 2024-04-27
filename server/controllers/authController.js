const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const Home = async (req, res) => {
    try {
        res.status(200).send('Hwllo');
    } catch (error) {
        res.status(400).send('Page not found');
    }
}

/* 
-------------------
User registration
-------------------
*/
const Signup = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        //User existance check
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(400).send('Email already exists.');
            // const status = 400;
            // const message = `Email already exists`;
            // const extraDetails = ``;
            // next({ status, message, extraDetails });
        } else {
            //Create user
            const result = await User.create({ name, email, phone, password });
            res.status(201).send({
                message: `Registration successful`
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Something went wrong. Please try again.');
    }
}

/* 
-------------------
User login
-------------------
*/
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send('Invalid credentials');
        } else {
            const isPasswordValid = await user.comparePassword(password);
            if (isPasswordValid) {
                res.status(200).send({
                    message: `Login successful`,
                    token: await user.generateToken(),
                    userId: user.id.toString()
                });
            } else {
                res.status(400).send('Invalid credentials');
            }
        }
    } catch (error) {
        res.status(505).send('Server error');

    }
}

const UserProfile = async (req,res) =>{
    try {
        const userData = req.user;
        return res.status(200).send(userData);
    } catch (error) {
        res.status(401).send(`Unauthorized`);
        
    }
}

module.exports = { Home, Signup, Login, UserProfile }