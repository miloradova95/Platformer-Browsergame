import { ImageObject } from "./imageObject.js";
import {interpolateValueToFPS} from "../GameHelpers/frameRateHelper.js";


class Arrow extends ImageObject {
/*
    The Arrow class is a child class of the ImageObject class with the type 'projectile'.
    The Arrow class is used to create an arrow object that is shot by the playerFigure.
*/

    type = 'projectile';

    moveBy = {left: 0, top: 0};
    
    firstUpdate = true;

    update() {
        this.position.x += interpolateValueToFPS(this.moveBy.left);
    }

}

export { Arrow };