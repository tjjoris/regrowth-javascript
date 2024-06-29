
//called on load, sets up the game.
window.onload = function() {
    let board = document.getElementById("board");
    let isUnits = [true, true, true];
    let healths = [10, 10, 10];
    let maxHealths = [10, 10, 10];
    setGame();
}

let tile = new Array;
let indicator = new Array;
//sets up the game.
function setGame () {

    //create grid hp bars
    for (let i=0; i<3; i++){
        indicator[i] = document.createElement("div");
        indicator[i].id = "health" + i.toString();
        indicator[i].className = "indicator";
        board.appendChild(indicator[i]);
        // indicator[i].innerHTML = "100";

    }
    //create grid units
    for (let i=0; i<3; i++){
        tile[i] = document.createElement("div");
        tile[i].id = "ship" + i.toString();
        tile[i].classList.add("tile");
        tile[i].isShip = true;
        tile[i].buildMax = 3;
        tile[i].buildCurrent = 0;
        tile[i].hpMax = 10000;
        tile[i].hpCurrent = tile[i].hpMax;
        //click a ship to turn it into a circle.
        tile[i].clicked = function clicked(){
            if (this.isShip == true){
                this.beginRegrowth();
            }
        }
        //update unit.
        tile[i].update = function update(){
            this.updateByStatus();
            indicator[i].innerHTML = tile[i].hpCurrent.toString();
            console.log(this.hpCurrent)
        }
        tile[i].updateByStatus = function updateByStatus(){
            if (this.isShip == true){
                this.lowerShipHP();
                return;
            }
            this.updateCircle();
        }
        tile[i].lowerShipHP = function lowerShipHP(){
        //lower ship hp.
            this.hpCurrent -= 1;
            return;
        }
        tile[i].updateCircle = function updateCircle(){
            //change to a ship.
            if (this.buildCurrent >= this.buildMax) {
                this.isShip = true;
                this.ship.src = "./ship.png";
                return;
            }//increase build counter.
            this.buildCurrent ++;
            console.log(this.buildCurrent);
            return;
        }
        //begin regrowth
        tile[i].beginRegrowth = function beginRegrowth(){
            this.isShip = false;
            this.ship.src = "./circle.png";
            this.buildCurrent = 0;

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
