const { resultCodeFail } = require('../constants/constants');
function handleError(res, error, code = 500) {
  res.status(code).send({
    statusCode: resultCodeFail,
    message: error.message ? error.message : error
  })
}

module.exports = handleError;