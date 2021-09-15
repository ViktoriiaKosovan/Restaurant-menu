const Joi = require("joi");
const { resultCodeFail, httpCodes } = require("../constants/constants");

const validationMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res
        .status(httpCodes.VALIDATION_ERROR)
        .send({ statusCode: resultCodeFail, error: message });
    }
  };
};

module.exports = validationMiddleware;