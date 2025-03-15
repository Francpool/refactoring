// Following the example, create an app with toy data in data.json that handles GET and POST request to
// return (read) all toys or make (create) a new toy.
// Look at the getNewToyID() function.
// a) Try to show with a repeatable porccess that this function creates bugs.
//b) Restore the bugs withouth going random numbers generate.

const express = require("express"); // Importar Express
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
const toys = JSON.parse(fs.readFileSync("./data/data.json", 'utf-8'));

app.use('/assets', express.static(__dirname + '/public'));

app.get('/api/v1/toys', (req, res) => {
    res.status(200).json({
        status: "success",
        data: toys
    });
});


app.get('/firstpage', (req, res) => {
    fs.readFile("index.html", (err, buffer) => {
        // Save the html file as a string in a
        // variable so we can use it later
        const html = buffer.toString();
        
        res.setHeader('Content-Type', 'text/html');

        // Display the response content as an HTML text to the client
        res.send(html);
    })
});
app.post('/api/v1/toys', (req, res) => {
    const newToy = Object.assign({ id: getNewToyID() }, req.body);
    toys.push(newToy);
    
    // Write the object to the file
    fs.writeFile("./data/data.json", JSON.stringify(toys), err =>
        res.status(201)
        .json({ status: "success", data: toys }));
})

app.listen(port);

function getNewToyID() {
    const lastToy = toys[toys.length - 1];
    return lastToy.id + 1;
}