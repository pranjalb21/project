
const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody
        next()
    } catch (error) {
        const status = 400;
        const message = `Please fill the input properly`
        const extraDetails = []
        error.issues.map(e => extraDetails.push(e.message));
        console.log(extraDetails);
        next({ status, message, extraDetails })
    }
}

module.exports = validate;