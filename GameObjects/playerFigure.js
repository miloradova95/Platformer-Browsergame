import {canvasBoundaries} from "../GameLayers/canvasLayer.js";
import {ImageObject} from "./imageObject.js";
import {interpolateValueToFPS} from "../GameHelpers/frameRateHelper.js";
import {Arrow} from "./arrow.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { gameObjects } from "../GameLayers/coreLayer.js";

import { gameState } from "../script.js";

class PlayerFigure extends ImageObject {

    /*
        The Playerfigure class is a child class of the ImageObject class with the type 'player'.
        This represents the player of the game that is controlled by the user.
        It has the same properties as the ImageObject class and the following additional properties:
        Life: The amount of live the player has.
        shoot: A function that is called in the script.js when the playerFigure shoots an arrow.
        
        There are svereal functions that are overwritten in the PlayerFigure class:
        The draw function is overwritten to draw the live bar of the playerFigure.
        The update function is overwritten to make the playerFigure move when the user presses the arrow keys.
        The onCollision function is overwritten to make the playerFigure lose live when hit by npc and to make the playerFigure stop moving when colliding with an obstacle.
        Also the collision with the hole object is checked here and the function GameOver() is called when the playerFigure falls through the map.

    */


    type = 'player';
    
    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
        this.Life = 1400;
    }

    drawHealthBar(canvasContext) {
        const barWidth = (this.Life);
        const barHeight = 10;       
        const barPositionX = 10;    
        const barPositionY = 15;    

        canvasContext.save();
        canvasContext.fillStyle = 'red'; // Color of the health bar
        canvasContext.fillRect(barPositionX, barPositionY, barWidth, barHeight);
        canvasContext.restore();
    }

    draw() {
        super.draw();
        this.drawHealthBar(canvasContext);
    }

    shoot = () => {
        let bullet = new Arrow(this.position.x, this.position.y + 40, 40, 10, "./images/arrow_new2.png", 1, 1);
        if (this.lookDirection == "left") {
            bullet.moveBy.left = -6;
            this.startAnimation(10,10);
        } else if (this.lookDirection == "right") { 
            bullet.moveBy.left = 6;       
            this.startAnimation(0,0)
        }

    }

    isMoving = false;

    moveBy = {
        "left": 0,
        "top": 0
    }

    lookDirection = "left"

    changeMovement(x, y) {
        this.moveBy.left = x;
        this.moveBy.top = y;
    }

    checkWorldPosition() {
        if (this.boundaries.getBottomBoundary() <= canvasBoundaries.getTopBoundary()){
            this.position.y = canvasBoundaries.getBottomBoundary();
        }
        else if (this.boundaries.getRightBoundary() <= canvasBoundaries.getLeftBoundary()){
            this.position.x = canvasBoundaries.getRightBoundary();
        }
        else if (this.boundaries.getTopBoundary() >= canvasBoundaries.getBottomBoundary()){
            this.position.y = canvasBoundaries.getTopBoundary() - this.dimensions.width;
        }
        else if (this.boundaries.getLeftBoundary() >= canvasBoundaries.getRightBoundary()){
            this.position.x = canvasBoundaries.getLeftBoundary()- this.dimensions.height;
        }
    }

    firstUpdate = true;
    update() {
        this.position.x += interpolateValueToFPS(this.moveBy.left);
        this.position.y += interpolateValueToFPS(this.moveBy.top);
    }


    onCollision = (otherObject) => {
        if (otherObject.constructor.name === "Obstacle") {
            this.startAnimation(19,19);
        }
        if (otherObject.type === "npc" && otherObject.isDying == false) {
            this.Life -= 10;
        }
        if (this.Life <= 0) {
            gameState.isOver = true;
        }   
        if (otherObject.type === "hole") {
            gameState.isOver = true;
        }
    }

// }
}

export {PlayerFigure}