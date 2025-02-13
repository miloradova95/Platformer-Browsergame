import {canvasContext} from "../GameLayers/canvasLayer.js";
import {gameObjects} from "../GameLayers/coreLayer.js";

class GameObject {
    active = true;
    moveBy = {};
    gameObjectIndex = -1;
    isRigid = false;
    type = 'gameobject'

    ignoreCollision = false;

    gravityAttributes = {
        "useGravity": false,
        "antiGravityForce": 0,
        "midair": false,
        "stoppingObject": null
    }

    position = {
        "x": 0,
        "y": 0
    }

    previousPosition = {
        "x": 0,
        "y": 0
    }

    dimensions = {
        "width" : 0,
        "height": 0
    }

    boundaries = {
        "getTopBoundary": () => {
            return this.position.y + this.boundaryOffsets.top;
        },
        "getLeftBoundary": () => {
            return this.position.x + this.boundaryOffsets.left;
        },
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height - this.boundaryOffsets.bottom;
        },
        "getRightBoundary":() =>  {
            return this.position.x + this.dimensions.width - this.boundaryOffsets.right;
        }
    }

    boundaryOffsets = {
        "top": 0,
        "left": 0,
        "bottom": 0,
        "right": 0,
    }

    constructor(x, y, width, height) {
        this.position.x = x;
        this.position.y = y;
        this.previousPosition.x = x;
        this.previousPosition.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.gameObjectIndex = gameObjects.length;
        gameObjects.push(this);
    }

    storeCurrentPosition = () => {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
        
    }

    restorePreviousPosition = () => {
        this.position.x = this.previousPosition.x;
        this.position.y = this.previousPosition.y;
 


    
}

    update() {

    }

    draw() {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    setBoundaryOffsets(top, left, bottom, right) {
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.bottom = bottom;
        this.boundaryOffsets.right = right;
    }

    onCollision() {

    }


    checkForCollision = () => {
        for (let i = this.gameObjectIndex + 1; i < gameObjects.length; i++) {
            let checkObject = gameObjects[i];
            //overlap on x axis
            if (checkObject.active === false)
                continue;
            if(this.boundaries.getLeftBoundary() <= checkObject.boundaries.getRightBoundary() &&
                this.boundaries.getRightBoundary() >= checkObject.boundaries.getLeftBoundary())
            {
                //overlap on y axis
                if(this.boundaries.getTopBoundary() <= checkObject.boundaries.getBottomBoundary() &&
                    this.boundaries.getBottomBoundary() >= checkObject.boundaries.getTopBoundary())
                {
                    //I am colliding with something
                    this.onCollision(checkObject);
                    checkObject.onCollision(this);
                }
            }
        }
    }

    isCollidingWithObject(checkObject) {
        if(this.boundaries.getLeftBoundary() <= checkObject.boundaries.getRightBoundary() &&
            this.boundaries.getRightBoundary() >= checkObject.boundaries.getLeftBoundary())
        {
            //overlap on y axis
            if(this.boundaries.getTopBoundary() <= checkObject.boundaries.getBottomBoundary() &&
                this.boundaries.getBottomBoundary() >= checkObject.boundaries.getTopBoundary())
            {
                return true;
            }
        }
    }
}

export {GameObject}