const handleError = (err, res, info, code=500 ) => {
  const { message } = err;
  res.status(code).send({
    message,
    messageInfo: info
  });
  
};
module.exports = handleError;