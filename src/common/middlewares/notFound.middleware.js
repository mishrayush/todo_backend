/**
 * Middleware to handle unknown routes (404 errors)
 */
const notFound = (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  };
  
  module.exports = notFound;
  