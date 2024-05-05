const z = require('zod');

const blogValidatorSchema = z.object({
    userId: z.string()
        .trim(),
    title: z.string({ required_error: `Title can't be empty` })
        .trim()
        .min(3, { message: 'Title has to be minimum 3 characters.' }),
    image: z.string({ required_error: `Image can't be empty` })
        .trim()
        .nonempty({message:`Please choose an image to upload.`}),
    description: z.string({ required_error: `UserId can't be empty` })
        .trim()
        .min(3, { message: 'Description has to be minimum 3 characters.' }),
})

module.exports = blogValidatorSchema;