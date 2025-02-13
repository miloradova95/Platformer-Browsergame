import { PlayerFigure } from "./playerFigure.js";
import {canvasContext as ctx} from "../GameLayers/canvasLayer.js";
import { gameObjects } from "../GameLayers/coreLayer.js";
import { GameObject } from "./gameObject.js";
import { ImageObject } from "./imageObject.js";
import { Sight } from "./sight.js";

class npc extends ImageObject {

    /*
        The npc class is a child class of the ImageObject class with the type 'npc'.
        This represents the enemy of the game that is trying to kill the playerFigure when in sight.
        It has the same properties as the ImageObject class and the following additional properties:
        macLive: The maximum amount of live the npc has.
        sightLeft: The sight of the npc to the left.
        sightRight: The sight of the npc to the right.
        isDetected: A boolean that is true when the npc has detected the playerFigure.

        The Object sight is instantiated in the constructor of the npc class and represents the area of sight of the npc.
        When the playerFigure is in the area of sight of the npc, the npc will start to move towards the playerFigure.

        The Oncollision function of NPC is overwritten to make the npc lose live when hit by an arrow and to make the playerFigure stop moving when colliding with the npc.

        The draw function of the npc class is also overwritten to draw the live bar of the npc.

        The update function of the npc class is overwritten to make the npc move towards the playerFigure when the playerFigure is in the area of sight of the npc
        aswell as the dying animation of the npc, when the 0 amount of live is reached and the NPC Object is spliced from the gameObjects array after the animation is finished.
    */

    type = 'npc';
    currentSight = null;
    activeTimer = null;
    animationStarted = false;
    isDying = false;

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor);
        this.maxLive = 30;
        this.sightLeft = new Sight(this, 150, 128, "left");
        this.sightRight = new Sight(this, 150, 128, "right");
        this.isDetected = false;
    }



    onCollision(otherObject) {
        if (otherObject.type === "projectile") {
            this.maxLive -= 10
            gameObjects.splice(gameObjects.indexOf(otherObject), 1)}
        
        if (otherObject.type === "player") {
        otherObject.moveBy.left = 0;
        otherObject.moveBy.top = 0;
        otherObject.restorePreviousPosition();
     }
    }

     

        draw() {
        super.draw();

        

        ctx.save();

                ctx.fillStyle = 'red';

                ctx.fillRect(this.position.x + 16, this.position.y - 15, this.maxLive, 10);

        ctx.restore();
     }

    update() {
        if (this.isDying == true) {
            return 
        }

        if (this.maxLive <= 0) {

            this.isDying = true;
    
            clearTimeout(this.activeTimer)
    
            this.startAnimation(20,29);
    
            setTimeout(() => {
                gameObjects.splice(gameObjects.indexOf(this), 1)
            }, 1350)
        }


        if (this.isDetected == true) {
            let startSprite = 11
            let endSprite = 19

            if (this.currentSight.direction == "left") {
                this.position.x -= 2,5
            }
            else if (this.currentSight.direction == "right") {
                this.position.x += 2,5
                startSprite = 1
                endSprite = 9
            }

            if (this.animationStarted == false) {
                this.startAnimation(startSprite,endSprite)
                this.animationStarted = true
                console.log("animation started")
                console.log(startSprite, endSprite)
            }
    

            if (this.activeTimer == null) {
                this.activeTimer = setTimeout(() => {
                    console.log("animation stopped")
                    this.isDetected = false;
                    this.activeTimer = null;
                    this.animationStarted = false;
                    this.startAnimation(10,10);
                }, 1500);
            }
        }

    }
}





    

export { npc };