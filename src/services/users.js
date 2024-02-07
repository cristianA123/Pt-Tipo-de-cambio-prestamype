const { User } = require("../models");
const bcryptjs = require("bcryptjs");

class UserService {
  constructor() {}
  async create(data) {
    const { email, password } = data;
    const user = new User({ email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    return user;
  }
}

module.exports = UserService;
