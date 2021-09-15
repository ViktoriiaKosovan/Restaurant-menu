const Joi = require('joi');
const { resultCodeFail }=require('../constants/constants')
const validationMiddleware = (schema, property) => { 
  return (req, res, next) => { 
      const { error, value } = schema.validate(req.body);
      if (!error) { 
          next(); 
      } else {
        console.log(error)
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
      
   res.status(422).send({  statusCode: resultCodeFail, error: message }) } 
  } 
} 
module.exports = validationMiddleware;