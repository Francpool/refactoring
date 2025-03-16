// Following the example, create an app with toy data in data.json that handles GET and POST request to
// return (read) all toys or make (create) a new toy.
// Look at the getNewToyID() function.
// a) Try to show with a repeatable porccess that this function creates bugs.
//b) Restore the bugs withouth going random numbers generate.

const express = require("express");
const toyRoutes = require("./routes/toyRoutes");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/v1/toys", toyRoutes);
app.use("/assets", express.static(__dirname + "/public"));

app.get("/firstpage", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
