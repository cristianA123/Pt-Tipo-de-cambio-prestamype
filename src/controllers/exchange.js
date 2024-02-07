const { response, request } = require("express");
const axios = require("axios");

const { Exchange } = require("../models");
const { getRates } = require("../api/api");
const ExchangeService = require("../services/exchange");


const exchangeService = new ExchangeService();

const createExchange = async (req = response, res = request, next) => {
  try {

    const body = req.body;
    const id_usuario = req.user.id;

    const exchange = await exchangeService.create(body, id_usuario, res);

    return res.status(201).json({
      success: true,
      message: "Creado Exitosamente",
      exchange,
    });
  } catch (error) {
    next(error);
  }
};

const listExchange = async (req, res, next) => {
  try {
      const id_usuario = req.user.id;
      const data = await exchangeService.find(id_usuario);
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


const deleteExchange  = async (req, res, next) => {
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
        success: true,
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
