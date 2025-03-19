const PlayerModel = require('../models/playerModel');


function getPlayers(req, res) {
    res.status(200).json({
        status: "success",
        data: PlayerModel.getAllPlayers(),
    });
}

function createPlayer(req, res) {
    const newPlayer = req.body;
    const player = PlayerModel.addPlayer(newPlayer);
    res.status(201).json({
        status: "success",
        data: player,
    });
}

function getPlayer(req, res) {
    const id = Number(req.params.id);
    const player = PlayerModel.getPlayerById(id);
    if (!player) {
        return res.status(404).json({
            status: "fail",
            message: "Player not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: player,
    });
}

function updatePlayer(req, res) {
    const id = Number(req.params.id);
    const updates = req.body;
    const player = PlayerModel.updatePlayerById(id, updates);
    if (!player) {
        return res.status(404).json({
            status: "fail",
            message: "Player not found",
        });
    }
    res.status(200).json({
        status: "success",
        data: player,
    });
}

function deletePlayer(req, res) {
    const id = Number(req.params.id);
    const player = PlayerModel.deletePlayerById(id);
    if (!player) {
        return res.status(404).json({
            status: "fail",
            message: "Player not found",
        });
    }
}

module.exports = {
    getPlayers,createPlayer, getPlayer,updatePlayer,deletePlayer
};