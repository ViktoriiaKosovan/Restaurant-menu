const Joi = require("joi");

const infoValidators = {
  id: Joi.string().guid({ version: "uuidv4" }),
  address: Joi.string().max(70).required(),
  contacts: Joi.string().max(30).required(),
  wiFi: Joi.string().max(20).required(),
  isNew: Joi.boolean(),
};

const infoUpdateSchema = Joi.object({ ...infoValidators });

module.exports = infoUpdateSchema;
