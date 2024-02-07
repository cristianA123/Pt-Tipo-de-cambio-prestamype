
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

module.exports = { errorHandler, logErrors };
