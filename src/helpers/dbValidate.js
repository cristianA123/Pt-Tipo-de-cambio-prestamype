const { User } = require("../models");

const emailExists = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

const exchangeRateValid = async (tipo_de_cambio) => {
  if (tipo_de_cambio !== "compra" && tipo_de_cambio !== "venta") {
    throw new Error(`El tipo de cambio: ${tipo_de_cambio}, No es valido`);
  }
};

const ceroValid = async (value) => {
  if (value === 0) {
    throw new Error("El monto a enviar no puede ser cero");
  }
  return true;
};

module.exports = {
  emailExists,
  exchangeRateValid,
  ceroValid,
};
