const Joi = require("joi");

const mealValidators = {
  img: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(30).required(),
  description: Joi.string().allow("", null),
  weight: Joi.string().min(1).max(5).required(),
  price: Joi.string().min(1).max(5).required(),
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
