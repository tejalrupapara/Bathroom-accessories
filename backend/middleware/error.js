/**
 * Global Error Handling Middleware.
 * Catches all unhandled controller exceptions and standardizes responses.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Server Error:', err);

  // Set response code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    // Output detailed stack traces only in non-production environments
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = errorHandler;
