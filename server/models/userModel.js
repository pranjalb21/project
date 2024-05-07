const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: [true, `User already exists.`] },
        phone: { type: Number, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

//Secure password before storing into database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    }
})

//Compare user provided password with hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//Generate token
userSchema.methods.generateToken = async function () {
    try {
        const token = await jwt.sign(
            {
                userID: this.id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SIGN,
            {
                expiresIn: "1d"
            }
        )
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
