const { app, PORT } = require("./src/app.js");

// Iniciar el servidor 
app.listen(PORT, () => {
  console.log(
    `Servidor levantado en el puerto ${PORT}`
  );
});
