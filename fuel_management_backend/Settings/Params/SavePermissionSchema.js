const Joi = require('joi');

// Joi schema for validating the JSON
const SavePermissionSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            id: Joi.number().required(),       // id must be a number and is required
            name: Joi.string().required(),    // name must be a string and is required
            create: Joi.boolean().required(), // create must be a boolean and is required
            read: Joi.boolean().required(),   // read must be a boolean and is required
            update: Joi.boolean().required(), // update must be a boolean and is required
            delete: Joi.boolean().required()  // delete must be a boolean and is required
        })
    ).required() // items must be an array and is required
});

module.exports = SavePermissionSchema;
