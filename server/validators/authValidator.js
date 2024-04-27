const z = require('zod');

const userValidatorSchema = z.object({
    name: z.string({ required_error: "Name is required." })
        .trim()
        .min(3, { message: 'Name should be atleast 3 characters.' })
        .max(255, { message: `Name can not be more than 255 characters.` }),
    email: z.string({ required_error: "Email is required." })
        .trim()
        .email({ message: `Invalid email address.` })
        .toLowerCase()
        .min(3, { message: 'Email should be atleast 3 characters.' })
        .max(255, { message: `Email can not be more than 255 characters.` }),
    phone: z.string({ required_error: "Phone number is required." })
        .trim()
        .min(10, { message: 'Phone number should be of 10 characters.' })
        .max(10, { message: `Phone number can not be more than 10 characters.` }),
    password: z.string({ required_error: "Password is required." })
        .trim()
        .min(7, { message: 'Password length should be atleast 7.' })
        .max(255, { message: `Password can not be more than 255 characters.` }),
})

const loginValidatorSchema = z.object({
    email: z.string({ required_error: `Email is required` })
        .trim()
        .email({ message: `Invalid email address.` })
        .toLowerCase()
        .min(3, { message: 'Email should be atleast 3 characters.' })
        .max(255, { message: `Email can not be more than 255 characters.` }),
    password: z.string({ required_error: "Password is required." })
        .trim()
        .min(7, { message: 'Password length should be atleast 7.' })
        .max(255, { message: `Password can not be more than 255 characters.` }),
})

module.exports = { userValidatorSchema, loginValidatorSchema };