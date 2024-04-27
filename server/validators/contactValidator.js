const z = require('zod');

const contactValidatorSchema = z.object({
    name: z.string({ required_error: `Name is required.` })
        .trim()
        .min(3, { message: `Name must be of atleast 3 characters.` })
        .max(255, { message: `Name can not be more than 255 characters.` }),
    email: z.string({ required_error: `Email is required.` })
        .trim()
        .email()
        .toLowerCase()
        .min(3, { message: `Email must be of atleast 3 characters.` })
        .max(255, { message: `Email can not be more than 255 characters.` }),
    message: z.string({ required_error: `Message is required.` })
        .trim()
        .min(3, { message: `Message must be of atleast 3 characters.` })
        .max(1000, { message: `Message can not be more than 1000 characters.` }),
})

module.exports = contactValidatorSchema;