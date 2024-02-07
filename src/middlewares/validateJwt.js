const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/user");
const { config } = require("../config/config");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, config.secretorprivatekey);

    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Token no válido",
      });
    }

    if (!user.status) {
      return res.status(401).json({
        success: false,
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
