const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");

const {
  createExchange,
  listExchange,
  getDetailExchange,
  deleteExchange,
} = require("../controllers/exchange");
const { exchangeRateValid, ceroValid } = require("../helpers");

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("tipo_de_cambio")
      .not()
      .isEmpty()
      .withMessage("El tipo_de_cambio es obligatorio"),
    check("tipo_de_cambio").custom(exchangeRateValid),
    check("monto_enviar")
      .not()
      .isEmpty()
      .withMessage("El monto a enviar no puede estar vacío")
      .isFloat({ min: 0.00001 })
      .withMessage("El monto a enviar debe ser un número positivo")
      .custom(ceroValid),
    validateFields,
  ],
  createExchange
);

router.get("/", [validateJWT, validateFields], listExchange);

router.get(
  "/:id",
  [
    validateJWT,
    check("id").not().isEmpty().withMessage("El id es obligatorio"),
    check("id").isMongoId().withMessage("Id no válido"),
    getDetailExchange,
  ],
  createExchange
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id").not().isEmpty().withMessage("El id es obligatorio"),
    check("id").isMongoId().withMessage("Id no válido"),
    validateFields,
  ],
  deleteExchange
);

module.exports = router;
