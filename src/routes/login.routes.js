const agentes = require("../../data/agentes.js");
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");

const secretKey = "superSecretKey";
const tokenOptions = { expiresIn: "120s" };

router.get("/SignIn", async (req, res) => {
  try {
    const { email, password } = req.query;
    const logInAgent = {
      email,
      password,
    };
    let loggedUser = agentes.results.find(
      (user) => user.password === password && user.email === email
    );

    if (loggedUser) {
      const token = jwt.sign(logInAgent, secretKey, tokenOptions);

      res.status(200).json({
        status: "OK",
        is_Active: true,
        message: "Usuario logueado",
        token: token,
        loggedUser: loggedUser,
      });
    } else {
      res.status(200).send({
        message:
          "El usuario y/o la contraseña no son correctos. Vuelve a intentarlo",
        status: "Denied",
      });
    }
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).json(error);
  }
});

router.get("/Logged", async (req, res) => {
  try {
    const { token } = req.query;

    return jwt.verify(token, secretKey, (err, data) => {
      err
        ? res.status(204).json({
            status: "Error",
            message: "Usuario no encontrado",
            error: err,
          })
        : res.status(200).json({
            status: "OK",
            is_Active: true,
            message: "Usuario logueado",
            token: token,
          });
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).json(error);
  }
});

router.get("/admin", async (req, res) => {
  try {
    const { token } = req.query;

    return jwt.verify(token, secretKey, (err, data) => {
      err
        ? res.status(204).json({
            status: "Error",
            is_Active: false,
            message: "Fallo en la verificación",
            error: err,
          })
        : res.status(200).json({
            status: "OK",
            is_Active: true,
            message: "Usuario Verificado",
            token: token,
          });
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).json(error);
  }
});

router.get("/notFound", async (req, res) => {
  try {
    let token = "";
    return jwt.verify(token, secretKey, (err, data) => {
      err
        ? res.status(204).json({
            status: "Error",
            message: "Usuario no encontrado",
            error: err,
          })
        : res.status(200).json({
            status: "OK",
            is_Active: true,
            message: "Usuario logueado",
            token: token,
          });
    });
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).json(error);
  }
});
module.exports = router;
