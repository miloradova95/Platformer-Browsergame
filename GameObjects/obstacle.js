import {GameObject} from "./gameObject.js";
import { ImageObject } from "./imageObject.js";

class Obstacle extends ImageObject
{
    isRigid = true;
    type = 'obstacle';
    
    onCollision = (otherObject) => {
        if (otherObject.ignoreCollision == true) {
            return;
        }
       otherObject.moveBy.left = 0;
       otherObject.moveBy.top = 0;
        otherObject.restorePreviousPosition();
    }

}

export {Obstacle}
