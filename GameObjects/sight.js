import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";

class Sight extends GameObject {

    /*
        This class was by far the most challenging one to implement.
        The Sight class is a child class of the GameObject class with the type 'sight'. It is used to create the area of sight of the npc.
        That means that this class has to be linked to the npc class and has to move with the npc.
        So I created a constructor that takes the npc as a parameter and sets the position of the sight to the position of the npc.
        The updated draw function of the Sight class is overwritten to draw the sight as a transparent rectangle ("rgba(0, 0, 0, 0)").
        The collision detection of the sight is overwritten to make the npc detect the playerFigure when the playerFigure is in the area of sight.
        In the npc class the sight is instantiated in the constructor and the update function is overwritten to make the sight move with the npc.
        The NPC also moves when isDetected is true, which is set to true when the playerFigure is in the area of sight of the npc.
        There is also a Timer implemented in the npc class that makes the npc still moving after 3 seconds when the playerFigure is not in the area of sight of the npc.
        That makes the behaviour of the npc more realistic.
    */
    type = 'sight';
    direction = 0;


    constructor(npc, width, height, direction) {
        super(npc.position.x, npc.position.y, width, height);

        this.direction = direction;

        if (this.direction === "left") {
            this.position.x = npc.position.x -150;
        }
        else if (this.direction === "right") {
            this.position.x = npc.position.x + npc.dimensions.width
        }
        
        this.position.y = npc.position.y;

        this.npc = npc;
        this.ignoreCollision = true;
    }



    update() {
        if (this.direction === "left") {
            this.position.x = this.npc.position.x -150;
        }
        else if (this.direction === "right") {
            this.position.x = this.npc.position.x + this.npc.dimensions.width
        }
        
        this.position.y = this.npc.position.y;

    }


    draw() {

        canvasContext.fillStyle = "rgba(0, 0, 0, 0)";
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);


    }

    onCollision(otherObject) {
        if (otherObject.type === "player") { 
            if (this.npc.activeTimer != null) {
                clearTimeout(this.npc.activeTimer);
                this.npc.activeTimer = null;
            }
            this.npc.isDetected = true;
            if (this.npc.currentSight != this){
                this.npc.animationStarted = false
            }
            this.npc.currentSight = this;

        }

    }
        
    }


export { Sight };
