const Joi = require("joi");

const mealValidators = {
  img: Joi.string().required(),
  name: Joi.string().max(30).required(),
  description: Joi.string().allow("", null),
  weight: Joi.string().max(5).required(),
  price: Joi.string().max(5).required(),
  categoryId: Joi.string().guid({ version: "uuidv4" }).required(),
  availability: Joi.boolean(),
};

const mealCreateSchema = Joi.object({
  ...mealValidators,
});

const mealUpdateSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  ...mealValidators,
});

module.exports = { mealCreateSchema, mealUpdateSchema };
