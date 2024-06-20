
//called on load, sets up the game.
window.onload = function() {
    let board = document.getElementById("board");
    let isUnits = [true, true, true];
    let healths = [10, 10, 10];
    let maxHealths = [10, 10, 10];
    setGame();
}

//sets up the game.
function setGame () {

    //create grid hp bars
    for (let i=0; i<3; i++){
        let tile = document.createElement("div");
        tile.id = "health" + i.toString();
        tile.class = "health";
        board.appendChild(tile);

    }
    //create grid units
    for (let i=0; i<3; i++){
        let tile = new Array;
        tile[i] = new Object();
        tile[i].div = document.createElement("div");
        tile[i].div.id = "ship" + i.toString();
        tile[i].div.class = "tile";
        // tile.addEventListener("click", selectTile);
        board.appendChild(tile[i].div);
        let ship = document.createElement("img");
        ship.src = "./ship.png";
        tile[i].div.appendChild(ship);
    }
}

// //clicked tile
// function selectTile() {
//     if (isUnits[])
// }

// const unit = {
//     isUnit: true,
//     health: 10,
//     maxHealth: 10,

// }
