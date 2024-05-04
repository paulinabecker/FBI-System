const { Router } = require("express");
const router = Router();
const rutaLogin = require("./login.routes.js")

//Ruta Principal
router.get("/", (req, res) => {
  try {
    res.status(200).sendFile("index.html");
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

//Rutas
router.use("/", rutaLogin);
// Ruta Genérica

router.get("*", (req, res) => {
  try {
    res.status(404).send(`<h1>Sitio Web No Encontrado</h1>`);
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;