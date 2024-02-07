
const logErrors = (err, req, res, next) => {
  console.error('Error: ', {
    message: err.message,
    stack: err.stack,
  });
  next(err);
}

const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: 'No se pudo completar la operación. Contacte al administrador del sistema.',
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json({
      success: false,
      message: output.payload.message
    });
  } else {
    next(err);
  }
}

module.exports = { errorHandler, logErrors, boomErrorHandler };
