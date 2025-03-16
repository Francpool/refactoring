const ToyModel = require("../models/toyModel");

function getToys(req, res) {
    res.status(200).json({
        status: "success",
        data: ToyModel.getAllToys(),
    });
}

function createToy(req, res) {
    const newToy = ToyModel.addToy(req.body);
    res.status(201).json({ status: "success", data: newToy });
}

function getToy(req, res) {
    const id = Number(req.params.id);
    const toy = ToyModel.getToyById(id);

    if (!toy) {
        return res.status(404).json({
            status: "fail",
            message: "id not exist"
        });
    }

    res.status(200).json({
        status: "success",
        data: toy
    });
}


// Controlador para actualizar un juguete por ID
function updateToy(req, res) {
    const id = Number(req.params.id);
    const updatedToy = ToyModel.updateToyById(id, req.body);

    if (!updatedToy) {
        return res.status(404).json({
            status: "fail",
            message: "ID not found"
        });
    }

    res.status(200).json({
        status: "success",
        data: updatedToy
    });
}


module.exports = { getToys, createToy,getToy, updateToy };
