
const { Exchange } = require('../models');
const { getRates } = require('../api/api');

const TIPO_DE_CAMIBIO = 'compra'

class ExchangeService {

  constructor(){
  }
  async create(data, id_usuario, res) {

    const { tipo_de_cambio, monto_enviar } = data;

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
      id_usuario,
    });

    return exchange;

  }

  async find(id_usuario) {
    const data = await Exchange.find({ id_usuario });
    return data;
  }

//   async findOne(id) {
//     const category = await models.Category.findByPk(id, {
//       // include: ['products']
//     });
//     if (!category) {
//       throw boom.notFound('category not found');
//     }
//     return category;
//   }

//   async update(id, changes) {
//     const category = await this.findOne(id);
//     const rta = await category.update(changes);
//     return rta;
//   }

//   async delete(id) {
//     const category = await this.findOne(id);
//     await category.destroy();
//     return { id };
//   }

}

module.exports = ExchangeService;
