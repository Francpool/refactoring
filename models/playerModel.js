const filePlayers = "./data/players.json";
const fs = require("fs");
function getAllPlayers() {
    return JSON.parse(fs.readFileSync(filePlayers, "utf-8"));
}
function savePlayers(players) {
    fs.writeFileSync(filePlayers, JSON.stringify(players, null, 2));
}

function getNewPlayerID(players) {
    if (players.length === 0) return 1; // Evitar errores si la lista está vacía
    return players[players.length - 1].id + 1;
}

function addPlayer(newPlayer) {
    const players = getAllPlayers();
    newPlayer.id = getNewPlayerID(players);
    players.push(newPlayer);
    savePlayers(players);
    return newPlayer;
}

function getPlayerById(id) {
    const players = getAllPlayers();
    if (isNaN(id)) {
        return res.status(400).json({ status: "fail", message: "Invalid ID" });
    }
    return players.find(player => player.id === id);
}

function updatePlayerById(id, updates
) {
    const players = getAllPlayers();
    const playerIndex = players.findIndex(player => player.id === id);

    if (playerIndex === -1) return null; // Si el jugador no existe, retornamos null

    const player = players[playerIndex];
    
    // Aplicamos las actualizaciones
    if (updates.firstname) player.firstname = updates.firstname;
    if (updates.lastname) player.lastname = updates.lastname;
    if (updates.age) player.age = updates.age;
    if (updates.team) player.team = updates.team;

    // Guardamos los cambios en el archivo JSON
    savePlayers(players);

    return player;
}

function deletePlayerById(id) {
    const players = getAllPlayers();
    const playerIndex = players.findIndex(player => player.id === id);

    if (playerIndex === -1) return null; // Si el jugador no existe, retornamos null

    // const player = players.splice(playerIndex, 1)[0];
    const player = players[playerIndex];
    players.splice(playerIndex, 1);
    savePlayers(players);

    return player;
}

module.exports = {
    getAllPlayers,
    addPlayer,
    getPlayerById,
    updatePlayerById,
    deletePlayerById};

