const Joi = require("joi");
const { resultCodeFail, httpCodes } = require("../constants/constants");

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      // const { details } = error;
      // const message = details.map((i) => i.message).join(",");
       let errorMessage = "";
        for (const err of error.details) {
            errorMessage += "" + err.path.join(" > ") + err.message.slice(err.message.lastIndexOf("\"") + 1) + "";
        }
      res
        .status(httpCodes.VALIDATION_ERROR)
        .send({ statusCode: resultCodeFail, error: errorMessage });
    }
  };
};

module.exports = validationMiddleware;