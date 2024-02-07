const boom = require("@hapi/boom");
const { Exchange } = require("../models");
const { getRates } = require("../api/api");

const TIPO_DE_CAMIBIO = "compra";

class ExchangeService {
  constructor() {}
  async create(data, id_usuario, res) {
    const { tipo_de_cambio, monto_enviar } = data;

    const tasa_de_cambio = await getRates();
    if (!tasa_de_cambio) {
      throw boom.notFound("Error al obtener la tasa de cambio");
    }

    const monto_recibir =
      tipo_de_cambio === TIPO_DE_CAMIBIO
        ? monto_enviar * tasa_de_cambio.purchase_price
        : monto_enviar / tasa_de_cambio.sale_price;

    const exchange = await Exchange.create({
      tipo_de_cambio,
      tasa_de_cambio,
      monto_enviar,
      monto_recibir,
      id_usuario,
    });

    return exchange;
  }

  async find(userId) {
    const data = await Exchange.find({ id_usuario: userId });
    return data;
  }

  async findOne(exchangeId, userId) {
    const data = await Exchange.findOne({
      _id: exchangeId,
      id_usuario: userId,
    });
    if (!data) {
      throw boom.notFound("No se encontro su solicitudes de cambio.");
    }
    return data;
  }

  async delete(exchangeId, userId) {
    const data = await Exchange.findOneAndDelete({
      _id: exchangeId,
      id_usuario: userId,
    });
    if (!data) {
      throw boom.notFound("No se encontro su solicitudes de cambio.");
    }
    return data;
  }
}

module.exports = ExchangeService;
