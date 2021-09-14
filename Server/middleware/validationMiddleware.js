const Joi = require('joi'); 
const validationMiddleware = (schema, property) => { 
  return (req, res, next) => { 
      const { error, value } = schema.validate(req.body);
  console.log(error, value )
  if (!error) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
 
    console.log("error", message); 
   res.status(422).send({ error: message }) } 
  } 
} 
module.exports = validationMiddleware;