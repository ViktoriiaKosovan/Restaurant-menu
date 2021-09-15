const Joi = require("joi");

const infoValidators = {
  id: Joi.string().guid({ version: "uuidv4" }),
  address: Joi.string().min(4).max(70),
  contacts: Joi.string().min(13).max(70),
  wiFi: Joi.string().min(8).max(12),
  isNew: Joi.boolean(),
};

const infoUpdateSchema = Joi.object({ ...infoValidators });

module.exports = infoUpdateSchema;
