
const axios = require("axios");
const { config } = require("../config/config");

const getRates = async () => {
    try {
        const { data } = await axios.get(
        config.ratesUrl
        );
        const rates = data.data;
        return rates;
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getRates,
};