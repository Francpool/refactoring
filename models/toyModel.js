

const filePath = "./data/data.json";
const fs = require("fs");
function getAllToys() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveToys(toys) {
    fs.writeFileSync(filePath, JSON.stringify(toys, null, 2));
}

function getNewToyID(toys) {
    if (toys.length === 0) return 1; // Evitar errores si la lista está vacía
    return toys[toys.length - 1].id + 1;
}

function addToy(newToy) {
    const toys = getAllToys();
    newToy.id = getNewToyID(toys);
    toys.push(newToy);
    saveToys(toys);
    return newToy;
}
function getToyById(id) {
    const toys = getAllToys();
    if (isNaN(id)) {
        return res.status(400).json({ status: "fail", message: "Invalid ID" });
    }
    return toys.find(toy => toy.id === id);
}

// Función para actualizar un juguete por ID
function updateToyById(id, updates) {
    const toys = getAllToys();
    const toyIndex = toys.findIndex(toy => toy.id === id);

    if (toyIndex === -1) return null; // Si el juguete no existe, retornamos null

    const toy = toys[toyIndex];

    // Aplicamos las actualizaciones
    if (updates.name) toy.name = updates.name;
    if (updates.description) toy.description = updates.description;
    if (updates.picture) toy.picture = updates.picture;
    if (updates.price) toy.price = Number(updates.price);

    // Guardamos los cambios en el archivo JSON
    saveToys(toys);

    return toy;
}

// Funcion para borrar un juguete por ID
function deleteToyById(id) {
    const toys = getAllToys();
    const toyIndex = toys.findIndex(toy => toy.id === id);

    if (toyIndex === -1) return null; // Si el juguete no existe, retornamos null

    const toy = toys[toyIndex];

    // Eliminamos el juguete de la lista
    toys.splice(toyIndex, 1);

    // Guardamos los cambios en el archivo JSON
    saveToys(toys);

    return toy;
}


module.exports = { getAllToys, addToy, getToyById, updateToyById,deleteToyById  };