const Joi = require('@hapi/joi');
const j2s = require('joi-to-swagger');

const error_schema = j2s(
  Joi.object().keys({
    error: Joi.string(),
  })
);

const objectsList_schema = j2s(
  Joi.array().items(
    Joi.object().keys({
      _id: Joi.string(),
      name: Joi.string(),
      is_completed: Joi.boolean(),
      deleted: Joi.boolean(),
      created_at: Joi.string(),
    })
  )
);

const object_schema = j2s(
  Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string(),
    is_completed: Joi.boolean(),
    deleted: Joi.boolean(),
    created_at: Joi.string(),
  })
);

const resOK_schema = j2s(
  Joi.object().keys({
    response: Joi.string(),
  })
);

const createdOK_schema = j2s(
  Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string(),
    is_completed: Joi.boolean(),
  })
);

const deletedOK_schema = j2s(
  Joi.object().keys({
    message: Joi.string(),
    id: Joi.string(),
  })
);

module.exports = { error_schema, objectsList_schema, object_schema, resOK_schema, createdOK_schema, deletedOK_schema };
