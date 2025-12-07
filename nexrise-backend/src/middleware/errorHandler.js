export function errorHandler(err, req, res, next) {
  console.error("Error Handler - Status:", err.statusCode || 500);
  console.error("Error Handler - Message:", err.message);
  console.error("Error Handler - Stack:", err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

