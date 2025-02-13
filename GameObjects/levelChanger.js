import { GameObject } from "./gameObject.js";
import {createLevel1, createLevel2, createLevel3, createLevel4, createLevel5} from "../script.js"

class LevelChanger extends GameObject{

    /*
        This class is a child class of the GameObject class and is used to create a level changer object. within the many createLevel functions in the script.js.
        It is a black rectangle and it appears on the borders of the map.
        When the playerFigure collides with the level changer, the level changes, depending on the level property of the level changer.
    */

    level = "";

    onCollision = (otherObject) => {
        if (otherObject.type === "player") {
            switch(this.level) {
                case "level1":
                    createLevel1()
                break;
                case "level2":
                    createLevel2()
                break;
                case "level3":
                    createLevel3()
                break;
                case "level4":
                    createLevel4()
                break;
                case "level5":
                    createLevel5()
                break;
            }
        }
    }
}

export {LevelChanger}