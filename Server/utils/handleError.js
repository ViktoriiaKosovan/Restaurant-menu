const { resultCodeFail, httpCodes } = require("../constants/constants");

function handleError(res, error, code = httpCodes.INTERNAL_ERROR) {
  res.status(code).send({
    statusCode: resultCodeFail,
    message: error.message ? error.message : error,
  });
}

module.exports = handleError;
