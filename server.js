// Following the example, create an app with toy data in data.json that handles GET and POST request to
// return (read) all toys or make (create) a new toy.
// Look at the getNewToyID() function.
// a) Try to show with a repeatable porccess that this function creates bugs.
//b) Restore the bugs withouth going random numbers generate.

const express = require("express");
const toyRoutes = require("./routes/toyRoutes");
const playerRoutes = require("./routes/playerRoutes");
const personRoutes = require("./routes/personRoutes");
const bodyParser = require('body-parser');
const connectDB = require('./config/mongodb'); // Importamos la conexión a la base de datos

const app = express();
const port = 3000;

// Conectar a la base de datos
connectDB(); // Establecer la conexión antes de iniciar el servidor

// Middleware para procesar solicitudes JSON
app.use(express.json());
app.use(bodyParser.json()); // Si usas body-parser también puedes configurarlo aquí

// Rutas
app.use("/api/v1/toys", toyRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/people", personRoutes);

// Servir archivos estáticos
app.use("/assets", express.static(__dirname + "/public"));

// Ruta de ejemplo
app.get("/firstpage", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
