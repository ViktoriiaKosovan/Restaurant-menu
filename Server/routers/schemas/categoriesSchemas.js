const Joi = require("joi");

const categoriesValidators = {
  title: Joi.string().min(4).max(30).required(),
  availability: Joi.boolean(),
};

const categoryCreateSchema = Joi.object({
  ...categoriesValidators,
});

const categoryUpdateSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  ...categoriesValidators,
});
module.exports = { categoryCreateSchema, categoryUpdateSchema };