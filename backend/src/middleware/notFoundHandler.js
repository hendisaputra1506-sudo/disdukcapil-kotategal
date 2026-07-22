const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
};

module.exports = notFoundHandler;
