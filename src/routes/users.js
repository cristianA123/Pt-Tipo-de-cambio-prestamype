const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares");

const { emailExists } = require("../helpers/dbValidate");
const { createUser } = require("../controllers/users");

const router = Router();

router.post(
  "/",
  [
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    validateFields,
  ],
  createUser
);

module.exports = router;
