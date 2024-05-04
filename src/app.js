const express = require("express");
const rutas = require("./routes/index.routes.js");

const app = express();
const PORT = 3000;

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//Rutas
app.use("/apiV1", rutas);

module.exports = { app, PORT };
