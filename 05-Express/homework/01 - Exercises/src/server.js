const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", (req, res) => {
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

server.get(`/posts`, (req, res) => {
  const { author } = req.query;
  const { title } = req.query;

  if (author && title) {
    const filtro = publications.filter(
      (publication) =>
        publication.author === author && publication.title === title
    );

    if (filtro.length > 0) {
      res.json(filtro);
    } else {
      res.status(404).json({
        error:
          "No existe ninguna publicación con dicho título y autor indicado",
      });
    }
  } else {
    res.status(404).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
  }
});

server.get(`/posts/:author`, (req, res) => {
  const { author } = req.params;

  if (author) {
    const filtro = publications.filter(
      (publication) => publication.author === author
    );

    if (filtro.length > 0) {
      res.json(filtro);
    } else {
      res.status(404).json({
        error: "No existe ninguna publicación del autor indicado",
      });
    }
  } else {
    res.status(404).json({
      error: "No existe ninguna publicación del autor indicado",
    });
  }
});

server.put(`/posts/:id`, (req, res) => {
  const { id } = req.params;
  const indiceElemento = publications.findIndex((el) => el.id === Number(id));
  const post = publications.find((post) => post.id === Number(id));

  if (req.body.title && req.body.contents) {
    if (post) {
      publications[indiceElemento] = {
        ...publications[indiceElemento],
        title: req.body.title,
        contents: req.body.contents,
      };

      res.json(publications[indiceElemento]);
    } else {
      res.status(404).json({
        error:
          "No se recibió el id correcto necesario para modificar la publicación",
      });
    }
  } else {
    res.status(404).json({
      error:
        "No se recibieron los parámetros necesarios para modificar la publicación",
    });
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
