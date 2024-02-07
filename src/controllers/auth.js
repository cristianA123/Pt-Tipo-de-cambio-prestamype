const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const { generateJWT } = require("../helpers/generateJWT");
const AuthService = require("../services/auth");

const authService = new AuthService();
const login = async (req, res = response, next) => {
  try {
    const data = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
