const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");
const { logErrors, errorHandler, boomErrorHandler } = require("../middlewares");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      exchange: "/api/exchange",
      users: "/api/users",
    };

    this.conectarDB();

    this.middlewares();

    this.routes();

    this.middlewaresErrors();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.exchange, require("../routes/exchange"));
    this.app.use(this.paths.users, require("../routes/users"));
  }

  middlewaresErrors() {
    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
