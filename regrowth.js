
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
        // tile[i] = new Object();
        tile[i] = document.createElement("div");
        tile[i].id = "ship" + i.toString();
        tile[i].class = "tile";
        tile[i].isShip = true;
        // tile[i].
        //click a ship to turn it into a circle.
        tile[i].clicked = function clicked(){
            if (this.isShip == true){
                this.isShip = false;
                this.ship.src = "./circle.png";
            }
        }
        tile[i].update = function update(){
            if (this.isShip == false){

            }
        }
        //event listener for clicking tile.
        tile[i].addEventListener("click", tile[i].clicked);
        board.appendChild(tile[i]);
        tile[i].ship = document.createElement("img");
        tile[i].class = "unit";
        tile[i].ship.src = "./ship.png";
        tile[i].appendChild(tile[i].ship);
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
