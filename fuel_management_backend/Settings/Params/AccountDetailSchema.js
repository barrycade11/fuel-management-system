const Joi = require('joi');

const AccountDetailSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  stationAssignments: Joi.array().items().required(),
  userRole: Joi.number().required(),
  status: Joi.bool().default(true),
});

module.exports = AccountDetailSchema;

