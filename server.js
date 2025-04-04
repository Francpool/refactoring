// Following the example, create an app with toy data in data.json that handles GET and POST request to
// return (read) all toys or make (create) a new toy.
// Look at the getNewToyID() function.
// a) Try to show with a repeatable porccess that this function creates bugs.
//b) Restore the bugs withouth going random numbers generate.

const express = require("express");
const toyRoutes = require("./routes/toyRoutes");
const playerRoutes = require("./routes/playerRoutes");
const personRoutes = require("./routes/personRoutes");
const toyRoutesLocal = require("./routes/toyRoutesLocalDB"); // Importamos las rutas para la base de datos local
const {connectLocalDB, connectCloudDB} = require('./config/driverMongo.DB'); // Importamos las conexiones a la base de datos

const app = express();
const port = 3000;


// Middleware para procesar solicitudes JSON
//connectDB(); // Conectar a la base de datos MongoDB
app.use(express.json());

// Rutas
app.use("/api/v1/toys", toyRoutes);
app.use("/api/v1/players", playerRoutes);
app.use("/api/v1/people", personRoutes);
app.use("/api/localmongo/toys", toyRoutesLocal); // Rutas para la base de datos local

// Servir archivos estáticos
app.use("/assets", express.static(__dirname + "/public"));

// Ruta principal para la interfaz de usuario
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
