const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
  });
  // res.status(404).json({
  //   message: error.message,
  // });
};

module.exports = errorHandler;
