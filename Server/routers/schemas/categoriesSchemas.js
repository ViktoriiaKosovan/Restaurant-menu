const Joi = require('joi');

const categoryCreateShema = Joi.object({
  
  title: Joi.string().min(4).max(30).required(),
  
});

const categoryUpdateShema = Joi.object({
  id: Joi.string().guid({ version : 'uuidv4' }).required(),
  title: Joi.string().min(6).max(30).required(),
  
});
module.exports = {categoryCreateShema, categoryUpdateShema};