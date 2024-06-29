
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
        tile[i].hpMax = 25;
        tile[i].hpCurrent = tile[i].hpMax;
        //click a ship to turn it into a circle.
        tile[i].clicked = function clicked(){
            if (this.isShip == true){
                this.beginRegrowth();
            }
        }
        //update unit.
        tile[i].update = function update(){
            //this will update either version of the unit
            this.updateByStatus();
            //dispaly info for unit.
            indicator[i].innerHTML = tile[i].hpCurrent.toString();
        }
        tile[i].updateByStatus = function updateByStatus(){
            //if ship, lower hp
            if (this.isShip == true){
                this.lowerShipHP();
                return;
            }
            //change to ship
            this.updateCircle();
        }
        tile[i].lowerShipHP = function lowerShipHP(){
            if (tile[i].hpCurrent <= 0) {
                this.beginRegrowth();
                return;
            }
        //lower ship hp.
            this.hpCurrent -= 1;
            return;
        }
        tile[i].updateCircle = function updateCircle(){
            //change to a ship.
            if (this.buildCurrent >= this.buildMax) {
                this.isShip = true;
                this.ship.src = "./ship.png";
                this.addInitialHPFromRegrowth();
                return;
            }//increase build counter.
            this.buildCurrent ++;
            return;
        }
        //begin regrowth
        tile[i].beginRegrowth = function beginRegrowth(){
            this.isShip = false;
            this.ship.src = "./circle.png";
            this.buildCurrent = 0;

        }
        //add initial hp from regrowth
        tile[i].addInitialHPFromRegrowth = function addInitailHPFromRegrowth(){
            //amount to add to current unit.
            let hpToAddToCurrent = this.hpMax;
            //check if hp is over max
            if (this.hpCurrent + this.hpMax > this.hpMax){
                //amount to add to current unit
                hpToAddToCurrent = this.hpMax - this.hpCurrent;
                //amount to add to other units.
                let extraHP = this.hpMax - this.hpToAddToCurrent;
                //the amount to heal the 1 of the 2 units in the first round.
                let halfExtra = extraHP / 2;
                //heal the first round.
                extraHP = tile[i].healOtherUnits(halfExtra, i);
                //heal the second round.
                tile[i].healOtherUnits(extraHP, i);
            }            
        }
        //heal all other units.
        tile[i].healOtherUnits = function healOtherUnits(amountToHeal, indexNotToHeal){
            //if amount to heal is 0 do nothing
            if (amountToHeal <= 0) {
                return;
            }
            //the amount left over after healing other units.
            let extraAfterHealingOhters =0;
            //loop all units other than the passed unit.
            for (let j=0; j<3; j++){
                if (indexNotToHeal == j) { 
                    continue;
                }
                extraAfterHealingOhters += tile[j].healFromOtherUnit(amountToHeal);
            }
            return extraAfterHealingOhters;
        }
        //extra healing for a single unit.
        tile[i].healFromOtherUnit = function healFromOtherUnit(amountToHeal){
           //check amoutn to heal is greater than 0.
            if (amountToHeal <= 0) {
                return;
            }
            this.hpCurrent += amountToHeal;
            let extra = 0;
            if (this.hpCurrent > this.hpMax){
                extra = this.hpCurrent - this.hpMax;
            }
            return extra;
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
