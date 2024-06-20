
//called on load, sets up the game.
window.onload = function() {
    let board = document.getElementById("board");
    let isUnits = [true, true, true];
    let healths = [10, 10, 10];
    let maxHealths = [10, 10, 10];
    setGame();
}

let tile = new Array;
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
    
    // var tile = new Array;
    for (let i=0; i<3; i++){
        // tile[i] = new Object();
        tile[i] = document.createElement("div");
        tile[i].id = "ship" + i.toString();
        tile[i].class = "tile";
        tile[i].isShip = true;
        tile[i].buildMax = 3;
        tile[i].buildCurrent = 0;
        // tile[i].
        //click a ship to turn it into a circle.
        tile[i].clicked = function clicked(){
            if (this.isShip == true){
                this.isShip = false;
                this.ship.src = "./circle.png";
                this.buildCurrent = 0;
            }
        }
        //update unit.
        tile[i].update = function update(){
            //build has finisehd, turn circle into ship.
            if (this.isShip == false){
                if (this.buildCurrent >= this.buildMax) {
                    this.isShip = true;
                    this.ship.src = "./ship.png";
                    return;
                }
                //increase build counter.
                this.buildCurrent ++;
                console.log(this.buildCurrent);
                return;
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
    setInterval(updateUnits, 500);
}
let count = 0;
let updateUnits = function updateUnits1(){
    for (let i=0; i<3; i++){
        tile[i].update();
    }
}
