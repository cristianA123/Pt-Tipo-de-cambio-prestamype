const boom = require("@hapi/boom");

const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers");

class AuthService {
  async login(data) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw boom.unauthorized("Usuario / Password no son correctos");
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      throw boom.unauthorized("Usuario / Password no son correctos");
    }

    const token = await generateJWT(user.id);

    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
