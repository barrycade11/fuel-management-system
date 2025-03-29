const Joi = require("joi");

// Define Joi validation schema
const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username is required",
        "string.empty": "Username cannot be empty",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.empty": "Password cannot be empty",
    }),
});


module.exports = loginSchema;
