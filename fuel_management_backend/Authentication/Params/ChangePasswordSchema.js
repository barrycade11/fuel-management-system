const Joi = require("joi");

// Define Joi validation schema
const ChangePasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).disallow(Joi.ref("password")).required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
});

module.exports = ChangePasswordSchema;
