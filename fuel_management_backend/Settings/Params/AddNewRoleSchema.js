
const Joi = require('joi');

const AddNewRoleSchema = Joi.object({
  role: Joi.string().required(),
  role_detail: Joi.string().empty(),
})

module.exports = AddNewRoleSchema;
