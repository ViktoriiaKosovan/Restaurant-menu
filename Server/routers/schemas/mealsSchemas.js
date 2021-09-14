const Joi = require('joi');

const mealCreateShema = Joi.object({  
    img:Joi.string().min(6).required(),
    name:Joi.string().min(6).max(30).required().allow(),
    description:Joi.string().min(15).max(150).optional(),
    weight:Joi.string().min(2).max(4).required(),
    price:Joi.string().min(1).max(5).required(),
    categoryId:Joi.string().guid({ version : 'uuidv4' }).required(),
});

const MealUpdateShema = Joi.object({
    id:Joi.string().guid({ version : 'uuidv4' }).required(),
    img:Joi.string().min(6).required(),
    name:Joi.string().min(6).max(30).required(),
    description: Joi.string().min(15).max(150),
    weight:Joi.string().min(2).max(4).required(),
    price:Joi.string().min(1).max(5).required(),
    categoryId:Joi.string().guid({ version : 'uuidv4' }).required(),
  
});
module.exports = {mealCreateShema, MealUpdateShema};