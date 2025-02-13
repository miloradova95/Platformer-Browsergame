import {gameObjects} from "../GameLayers/coreLayer.js";
import {interpolateValueToFPS} from "./frameRateHelper.js";

let gravityFactor = 9.81;

function applyGravityForces(fallingOrRisingObject, undoGravity) {
    fallingOrRisingObject.gravityAttributes.midair = true;
    if (!fallingOrRisingObject.gravityAttributes.useGravity) {
        return;
    }

    let isFalling = true;
    let multiplier = .5;

    if (fallingOrRisingObject.gravityAttributes.antiGravityForce > 0)
        isFalling = false;
    if (undoGravity)
        multiplier = -.5;
    if (isFalling)
        fallingOrRisingObject.position.y += interpolateValueToFPS(gravityFactor * multiplier);
    else {
        fallingOrRisingObject.gravityAttributes.antiGravityForce -= interpolateValueToFPS(gravityFactor * multiplier);
        fallingOrRisingObject.position.y -= interpolateValueToFPS(gravityFactor * multiplier);
    }
}

function checkForStoppingObjects(fallingOrRisingObject) {
    for (let i = 0; i < gameObjects.length; i++) {
        let isFalling = true;
        if (fallingOrRisingObject.gravityAttributes.antiGravityForce > 0) {
            isFalling = false;
        }
        let potentialStoppingObject = gameObjects[i];
        if (potentialStoppingObject.active === false || potentialStoppingObject.isRigid === false || potentialStoppingObject.gravityAttributes.useGravity === true)
            continue;
        let isColliding = fallingOrRisingObject.isCollidingWithObject(potentialStoppingObject)
        let currentStoppingObject = fallingOrRisingObject.stoppingObject;

        if (isColliding) {
            if (currentStoppingObject == null)
                fallingOrRisingObject.gravityAttributes.stoppingObject = potentialStoppingObject;
            else if (isFalling === true && potentialStoppingObject.boundaries.getTopBoundary() < currentStoppingObject.boundaries.getTopBoundary())
                fallingOrRisingObject.gravityAttributes.stoppingObject = potentialStoppingObject;
            else if (isFalling === false/*is rising*/ && potentialStoppingObject.boundaries.getBottomBoundary() > currentStoppingObject.boundaries.getBottomBoundary())
                fallingOrRisingObject.gravityAttributes.stoppingObject = potentialStoppingObject;
        }
    }
    if (fallingOrRisingObject.gravityAttributes.stoppingObject != null) {
        return true;
    }
}

function stopObject(fallingOrRisingObject) {
    applyGravityForces(fallingOrRisingObject, true);
    fallingOrRisingObject.gravityAttributes.midair = false;
    let stoppingObject = fallingOrRisingObject.gravityAttributes.stoppingObject;
    let isFalling = true;

    if (fallingOrRisingObject.gravityAttributes.antiGravityForce > 0) {
        isFalling = false;
    }

    if (isFalling) {
        fallingOrRisingObject.position.y = stoppingObject.boundaries.getTopBoundary() - fallingOrRisingObject.dimensions.height + fallingOrRisingObject.boundaryOffsets.bottom - 1;
    }
    else {
        fallingOrRisingObject.position.y = stoppingObject.boundaries.getBottomBoundary() - fallingOrRisingObject.boundaryOffsets.top;
        fallingOrRisingObject.gravityAttributes.antiGravityForce = 0;
    }
    fallingOrRisingObject.gravityAttributes.stoppingObject = null;
}

export {applyGravityForces, checkForStoppingObjects, stopObject}