
//called on load, sets up the game.
window.onload = function() {
    let board = document.getElementById("board");
    let isUnits = [true, true, true];
    let healths = [10, 10, 10];
    let maxHealths = [10, 10, 10];
    let title = document.getElementById("title")
    
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
    }
    //create grid units
    for (let i=0; i<3; i++){
        tile[i] = document.createElement("div");
        tile[i].id = "ship" + i.toString();
        tile[i].classList.add("tile");
        tile[i].isShip = true;
        tile[i].buildMax = 6;
        tile[i].buildCurrent = 0;
        tile[i].hpMax = 20;
        tile[i].hpCurrent = tile[i].hpMax;
        //click a ship to turn it into a circle.
        tile[i].clicked = function clicked(){
            if (this.isShip == true){
                this.beginRegrowth();
            }
        }
        //update unit.
        tile[i].update = function update(damage){
            //this will update either version of the unit
            this.updateByStatus(damage);
            //dispaly info for unit.
            indicator[i].innerHTML = tile[i].hpCurrent.toString();
        }
        tile[i].updateByStatus = function updateByStatus(damage){
            //if ship, lower hp
            if (this.isShip == true){
                this.lowerShipHP(damage);
                return;
            }
            //change to ship
            this.updateCircle();
        }
        tile[i].lowerShipHP = function lowerShipHP(damage){
            if (tile[i].hpCurrent <= 0) {
                this.beginRegrowth();
                return;
            }
        //lower ship hp.
            this.hpCurrent -= damage;
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
            //heal initial unit.
            let extraHP = tile[i].healSingleUnit(tile[i].hpMax);
            //extra hp to heal others.
            if (extraHP > 0) {
                //find half to heal a each unit.
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
                extraAfterHealingOhters += tile[j].healSingleUnit(amountToHeal);
            }
            return extraAfterHealingOhters;
        }
        //heal a single unit.
        tile[i].healSingleUnit = function healSingleUnit(amountToHeal){
            //heal.
            tile[i].hpCurrent += amountToHeal;
            //if hp is over max:
            if (tile[i].hpCurrent > tile[i].hpMax){
                //save amount over max.
                let extra = tile[i].hpCurrent - tile[i].hpMax;
                //set current hp to max.
                tile[i].hpCurrent = tile[i].hpMax;
                //return extra.
                return extra;
            }
            //return extra = 0;
            return 0;
        }
        //event listener for clicking tile.
        tile[i].addEventListener("click", tile[i].clicked);
        board.appendChild(tile[i]);
        tile[i].ship = document.createElement("img");
        tile[i].class = "unit";
        tile[i].ship.src = "./ship.png";
        tile[i].appendChild(tile[i].ship);
    }
    updateInterval = setInterval(updateUnits, 500);
}
let count = 0;
let updateUnits = function updateUnits1(){
    //game over staus:
    let gameOver = true;
    //count extra damage for each circle.
    let damage = 1;
    //loop to check if circles
    for (let i=0; i<3; i++){
        if (tile[i].isShip == true){
            gameOver = false;
        }
        else {
            damage += 1;
        } 
    }
    //loop to update
    for (let i=0; i<3; i++){
        tile[i].update(damage);
    }
    //set game over.
    if (gameOver == true){
        clearInterval(updateInterval);
        title.innerHTML = "Game Over";
    }
}
