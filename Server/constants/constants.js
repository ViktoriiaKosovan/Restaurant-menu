const resultCodeSuccess = 0;
const resultCodeFail = 1;
const successMessage = "Success";

const httpCodes = {
     OK : 200,
     INTERNAL_ERROR : 500,
     CREATED: 201,
     VALIDATION_ERROR : 422,
     UPDATE_ERROR : 409
}

module.exports = { resultCodeSuccess, resultCodeFail, successMessage, httpCodes };
