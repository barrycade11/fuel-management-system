const Joi = require('joi');

const AccountDetailUpdateSchema = Joi.object({
  username: Joi.string().required(),
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  stationAssignments: Joi.array().items().required(),
  userRole: Joi.number().required(),
  status: Joi.bool().default(true),
});

module.exports = AccountDetailUpdateSchema;

