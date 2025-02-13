import {GameObject} from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";


class Hole extends GameObject {

    /*
        Here I just added a new fillStyle in an overwritten draw function in order for the Hole object to be transparent. 
        It is inserted in areas of the map where the playerFigure can fall through the map. OnCollision with the type player,
        the function GameOver() is called. (PlayerFigure.js)
    */

    type = "hole";

    draw() {

        canvasContext.fillStyle = "rgba(0, 0, 0, 0)";


    }

}

export {Hole}