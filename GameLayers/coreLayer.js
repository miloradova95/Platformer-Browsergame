import {canvas, canvasContext} from "./canvasLayer.js";
import {setDefaultFrameRate, setNewTick, startGameClock} from "../GameHelpers/frameRateHelper.js";
import {applyGravityForces, checkForStoppingObjects, stopObject} from "../GameHelpers/gravityHelper.js";
import { gameOver, gameState } from "../script.js";

let gameObjects = [];
let gameLoopFirstRun = true;

/*
        The coreLayer.js file stayed the same for the most part, the only changes were introducing the deleteGameObjects function the call for the gameOver function,
        when the gameState.isOver is true. (The gameState wsa introduced in the script.js file)
 */

function deleteGameObjects() {

 
    gameObjects = [];
}

function gameLoop() {
    //gameLoopState 0 -> store positions and update all objects
    //gameLoopState 1 -> check if the updated objects are colliding
    //gameLoopState 2 -> apply Gravity Forces to all objects (where useGravity == true)
    //gameLoopState 3 -> check if objects (after applied gravity) are hitting something
    //gameLoopState 4 -> apply changes after gravity, execute mousehandlers and finally: DRAW

    if(gameLoopFirstRun === true) {
        startGameClock();
        setDefaultFrameRate(60);
        gameLoopFirstRun = false;
    }

    if (gameState.isOver === true) {
        gameOver();
    }
    setNewTick();
    canvasContext.clearRect(0,0, canvas.width, canvas.height);
    //updating values
    //detects collisions
    //apply physics
    //....
    for (let gameLoopState = 0; gameLoopState < 5; gameLoopState++) {
        for (let singleGameObject of gameObjects) {
            if (singleGameObject.active === true) {
                if (gameLoopState === 0) { // update ALL objects
                    singleGameObject.storeCurrentPosition();
                    singleGameObject.update();
                }
                else if (gameLoopState === 1) {
                    singleGameObject.checkForCollision();
                }
                else if (gameLoopState === 2) {
                    if (singleGameObject.gravityAttributes.useGravity === true) {
                        applyGravityForces(singleGameObject);
                    }
                }
                else if (gameLoopState === 3) {
                    if (singleGameObject.gravityAttributes.useGravity === true) {
                        let shouldBeStopped = checkForStoppingObjects(singleGameObject);
                        if (shouldBeStopped) {
                            stopObject(singleGameObject);
                        }
                    }
                }
                else if (gameLoopState === 4) {
                    singleGameObject.draw();
                }
            }
        }
    }

    
    requestAnimationFrame(gameLoop);
}

export {gameObjects, gameLoop, deleteGameObjects}