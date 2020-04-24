const Joi = require("@hapi/joi");
const j2s = require("joi-to-swagger");

const error_schema = j2s(
  Joi.object().keys({
    error: Joi.string(),
  })
);

const getTasksResOK_schema = j2s(
  Joi.array().items(
    Joi.object().keys({
      id: Joi.string(),
      name: Joi.string(),
      is_completed: Joi.boolean(),
      deleted: Joi.boolean(),
      created_at: Joi.string(),
    })
  )
);

module.exports = { error_schema, getTasksResOK_schema };
