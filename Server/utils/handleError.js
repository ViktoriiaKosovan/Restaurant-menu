const handleError = (err, res, code=500, info) => {
  const { message } = err;
  console.log(err);
  res.status(code).send({
    status: "error",
    message,
    messageInfo: info
  });
  
};
module.exports = handleError;