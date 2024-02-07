const { response, request } = require("express");
const axios = require("axios");

const { Exchange } = require("../models");
const { getRates } = require("../api/api");

const TIPO_DE_CAMIBIO = 'compra'

const createExchange = async (req = response, res = request) => {
  try {
    const { tipo_de_cambio, monto_enviar } = req.body;

    const tasa_de_cambio = await getRates()
    if (!tasa_de_cambio) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener la tasa de cambio",
      });
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
      id_usuario: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Creado Exitosamente",
      exchange,
    });
  } catch (error) {
    next(error);
  }
};

const listExchange = async (req, res) => {
  try {
      const userId = req.user.id;
      const data = await Exchange.find({ id_usuario: userId });
      return res.status(200).json({
        success: true,
        data
      });
  } catch (error) {
    next(error);
  }
}

const getDetailExchange  = async (req, res, next) => {
  try {
      const userId = req.user.id;
      const requestId = req.params.id;
      const data = await Exchange.findOne({ _id: requestId, id_usuario: userId });
      if (!data) {
          return res.status(404).json({ 
            success: false,
            message: 'No se encontro su solicitudes de cambio.' 
          });
      }
      return res.status(200).json({
        success: true,
        data
      });

  } catch (error) {
    next(error);
  }
}


const deleteExchange  = async (req, res) => {
  try {
      const userId = req.user.id;
      const exchangeId = req.params.id;
      const data = await Exchange.findOneAndDelete({ _id: exchangeId, id_usuario: userId });
      if (!data) {
          return res.status(404).json({ 
            success: false,
            message: 'No se encontro su solicitudes de cambio' 
          });
      }
      return res.json({ 
        message: 'Se elimino su solicitudes de cambio' 
      });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  createExchange,
  listExchange,
  getDetailExchange,
  deleteExchange,
};
