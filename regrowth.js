
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
        tile[i].div.isShip = true;
        //click a ship to turn it into a circle.
        tile[i].div.clicked = function clicked(){
            if (this.isShip = true){
                this.isShip = false;
                this.ship.src = ".circle.png";
            }
        }
        //event listener for clicking tile.
        tile[i].div.addEventListener("click", tile[i].div.clicked);
        board.appendChild(tile[i].div);
        tile[i].div.ship = document.createElement("img");
        tile[i].div.ship.src = "./ship.png";
        tile[i].div.appendChild(tile[i].div.ship);
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
