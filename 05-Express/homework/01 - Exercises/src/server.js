const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", function (req, res) {
  if (req.body.author && req.body.title && req.body.contents) {
    publications.push(req.body);
    res.json(publications);
  } else {
    res.status(404).json({
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    });
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
