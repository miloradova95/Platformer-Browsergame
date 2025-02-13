import {canvasContext} from "./GameLayers/canvasLayer.js";
import {deleteGameObjects, gameLoop} from "./GameLayers/coreLayer.js";
import {Obstacle} from "./GameObjects/obstacle.js";
import {PlayerFigure} from "./GameObjects/playerFigure.js";
import {Hole} from "./GameObjects/hole.js";
import {gameObjects} from "./GameLayers/coreLayer.js";
import {Arrow} from "./GameObjects/arrow.js";
import { npc } from "./GameObjects/NPC.js";
import { LevelChanger } from "./GameObjects/levelChanger.js";
import { ImageObject } from "./GameObjects/imageObject.js";

/*
	This is the main script file of the game.
	Here you can find the game loop and the event listeners for the keyboard as well as the instanciaztion of most of the game objects.
	You can also find the start screen and the game over screen here.

	The createLevel functions are used to create the areas of the game by deleting all the Objects in the GameObjects array and then creating new ones.
	They are called by the LevelChanger object when the player collides with it. In the Game it is a black rectangle on the borders of the canvas.

	The startGame function is called when the user clicks on the button on the start screen. document.querySelector is the method used to select elements from the HTML document.
	The startGame function hides the start screen and shows the game area. It also starts the game loop and sets the gameState.isOver to false.

	Two other functions are the respawnPlayer and the changeBackground . The latter changes the background image of the game area and is called by every new create level function.
	The respawnPlayer function is also called by the createLevel functions to respawn the playerFigure at the beginning of the level. 
	With that function, the Health of the playerFigure is not reset, after every level change.

	Further down on the script are all the keyevents for the playerFigure. The keyEventDown function is called when a key is pressed and the keyEventUp function is called when a key is released.
	This changes the behaviour of the playerFigure aswell as the respective animation.

	*/

let animFrame = null;
export const gameState = {
	isOver: false
}



function startGame() {
	document.querySelector('#startScreen').style.display = "none"
	document.querySelector('#gameArea').style.display = "block"

	let startSound = document.getElementById('startSound')

	startSound.loop = true;

	startSound.play();

	animFrame = requestAnimationFrame(gameLoop);
	gameState.isOver = false;
}

export function gameOver() {
	document.querySelector('#gameOver').style.display = "flex"
	document.querySelector('#gameArea').style.display = "none"
	cancelAnimationFrame(animFrame);
	gameState.isOver = true;
}

let startScreen = document.querySelector("#startScreen")
startScreen.addEventListener("click", startGame);


let playerFigureObject = new PlayerFigure(50, 700, 64, 128, "./images/AyluuSprite.png", 9, 1);
playerFigureObject.gravityAttributes.useGravity = true;
playerFigureObject.setBoundaryOffsets(23, 20, 0, 20);

function respawnPlayer(x,y) {
	gameObjects.push(playerFigureObject)
	playerFigureObject.position.x = x
	playerFigureObject.position.y = y
}

function changeBackground(newBackgroundUrl) {
    document.getElementById('backgroundImage').style.backgroundImage = `url('${newBackgroundUrl}')`;
}


createLevel1();

function createLevel1 () {

	deleteGameObjects();

	respawnPlayer(50, 700);

	
	let NPC = new npc (500, 120, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC2 = new npc (850, 150, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC4 = new npc (700, 150, 64, 128, "./images/SpriteLegion2.png", 9, 1);


	NPC.setBoundaryOffsets(0, 20, 0, 20);
	NPC.gravityAttributes.useGravity = true;
	NPC2.setBoundaryOffsets(0, 20, 0, 20);
	NPC2.gravityAttributes.useGravity = true;
	NPC4.setBoundaryOffsets(0, 20, 0, 20);
	NPC4.gravityAttributes.useGravity = true;



	let floor = new Obstacle(0, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor2 = new Obstacle(250, 731, 250, 50, "./images/floor.png", 1, 1);
	let platform1 = new Obstacle(550, 600, 150, 25, "./images/platform.png", 1, 1);
	let platform2 = new Obstacle(350, 500, 150, 25, "./images/platform.png", 1, 1);
	let platform3 = new Obstacle(200, 380, 150, 25, "./images/platform.png", 1, 1);
	let platform4 = new Obstacle(30, 250, 150, 25, "./images/platform.png", 1, 1);
	let floor3 = new Obstacle(250, 190, 250, 50, "./images/floor.png", 1, 1);
	let floor4 = new Obstacle(500, 190, 250, 50, "./images/floor.png", 1, 1);
	let floor5 = new Obstacle(800, 380, 250, 50, "./images/floor.png", 1, 1);
	let floor6 = new Obstacle(1050, 380, 250, 50, "./images/floor.png", 1, 1);
	let floor7 = new Obstacle(500, 731, 250, 50, "./images/floor.png", 1, 1);

	let hole1 = new Hole(500, 770, 826, 11);
	let platform5 = new Obstacle(1326, 756, 150, 25, "./images/platform.png", 1, 1);
	let levelChanger = new LevelChanger(1460, 731, 16, 128);
	levelChanger.level = "level2"
}

function createLevel2 () {

	changeBackground('./images/background_darker.png')

	deleteGameObjects();

	respawnPlayer(120, 700);

	let NPC = new npc (500, 120, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC2 = new npc (850, 150, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC4 = new npc (700, 150, 64, 128, "./images/SpriteLegion2.png", 9, 1);

	NPC.setBoundaryOffsets(10, 23, 0, 10);
	NPC.gravityAttributes.useGravity = true;
	NPC2.setBoundaryOffsets(10, 23, 0, 10);
	NPC2.gravityAttributes.useGravity = true;
	NPC4.setBoundaryOffsets(10, 23, 0, 10);
	NPC4.gravityAttributes.useGravity = true;

	let floor = new Obstacle(0, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor2 = new Obstacle(500, 450, 250, 50, "./images/floor.png", 1, 1);
	let floor3 = new Obstacle(250, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor4 = new Obstacle(500, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor5 = new Obstacle(750, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor6 = new Obstacle(900, 731, 250, 50, "./images/floor.png", 1, 1);
	let floor7 = new Obstacle(1150, 731, 250, 50, "./images/floor.png", 1, 1);

	let platform1 = new Obstacle(300, 600, 150, 25, "./images/platform.png", 1, 1);
	let platform2 = new Obstacle(850, 330, 50, 25, "./images/platform.png", 1, 1);
	let platform3 = new Obstacle(1000, 230, 50, 25, "./images/platform.png", 1, 1);
	let platform4 = new Obstacle(1226, 150, 250, 50, "./images/floor.png", 1, 1);

	let levelChanger = new LevelChanger(1460, 0, 16, 64);
	levelChanger.level = "level3"
}

function createLevel3 () {

	changeBackground('./images/background_evendarker.png')

	deleteGameObjects();

	respawnPlayer(120, 700);

	let NPC = new npc (250, 701, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC2 = new npc (400, 460, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC3 = new npc (800, 190, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC4 = new npc (1300, 701, 64, 128, "./images/SpriteLegion2.png", 9, 1);

	NPC.setBoundaryOffsets(10, 23, 0, 10);
	NPC.gravityAttributes.useGravity = true;
	NPC2.setBoundaryOffsets(10, 23, 0, 10);
	NPC2.gravityAttributes.useGravity = true;
	NPC3.setBoundaryOffsets(10, 23, 0, 10);
	NPC3.gravityAttributes.useGravity = true;
	NPC4.setBoundaryOffsets(10, 23, 0, 10);
	NPC4.gravityAttributes.useGravity = true;

	let floor = new Obstacle(0, 701, 1476, 80, "./images/Floor_wall.png", 1, 1);

	let platform1 = new Obstacle(50, 580, 50, 25, "./images/platform.png", 1, 1);
	let platform2 = new Obstacle(150, 380, 50, 25, "./images/platform.png", 1, 1);
	let platform3 = new Obstacle(250, 200, 50, 25, "./images/platform.png", 1, 1);
	let platform4 = new Obstacle(350, 131, 25, 600, "./images/Wall_vert.png", 1, 1);

	let platform5 = new Obstacle(650, 200, 250, 50, "./images/Platform_wall.png", 1, 1);
	let platform6 = new Obstacle(375, 450, 250, 50, "./images/Platform_wall.png", 1, 1);


	let levelChanger = new LevelChanger(1460, 650, 16, 131);
	levelChanger.level = "level4"

}

function createLevel4 () {

	changeBackground('./images/background_wall2.png')

	deleteGameObjects();

	respawnPlayer(120, 700);


	let NPC = new npc (540, 250, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC2 = new npc (700, 250, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC4 = new npc (1300, 725, 64, 128, "./images/SpriteLegion2.png", 9, 1);

	NPC.setBoundaryOffsets(10, 23, 0, 10);
	NPC.gravityAttributes.useGravity = true;
	NPC2.setBoundaryOffsets(10, 23, 0, 10);
	NPC2.gravityAttributes.useGravity = true;
	NPC4.setBoundaryOffsets(10, 23, 0, 10);
	NPC4.gravityAttributes.useGravity = true;

	let hole = new Hole(0, 775, 1476, 6);
	let platform1 = new Obstacle(120, 750, 50, 25, "./images/Platform_wall.png", 1, 1);
	let platform2 = new Obstacle(220, 550, 50, 25, "./images/Platform_wall.png", 1, 1);
	let platform3 = new Obstacle(320, 350, 50, 25, "./images/Platform_wall.png", 1, 1);

	let platform4 = new Obstacle(520, 250, 250, 50, "./images/Platform_wall.png", 1, 1);

	let platform5 = new Obstacle(980, 350, 50, 25, "./images/Platform_wall.png", 1, 1);
	let platform6 = new Obstacle(1080, 550, 50, 25, "./images/Platform_wall.png", 1, 1);
	let platform7 = new Obstacle(1226, 725, 250, 50, "./images/Platform_wall.png", 1, 1);

	let levelChanger = new LevelChanger(1460, 650, 16, 131);
	levelChanger.level = "level5"

}

function createLevel5() {

	changeBackground('./images/background_wall2.png')

	deleteGameObjects();

	respawnPlayer(120, 700);

	let NPC = new npc (100, 500, 64, 128, "./images/SpriteLegion2.png", 9, 1)
	;
	let NPC1 = new npc (500, 350, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC2 = new npc (650, 350, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC3 = new npc (800, 350, 64, 128, "./images/SpriteLegion2.png", 9, 1);

	let NPC4 = new npc (900, 701, 64, 128, "./images/SpriteLegion2.png", 9, 1);
	let NPC5 = new npc (1100, 701, 64, 128, "./images/SpriteLegion2.png", 9, 1);

	NPC.setBoundaryOffsets(10, 23, 0, 10);
	NPC.gravityAttributes.useGravity = true;
	NPC1.setBoundaryOffsets(10, 23, 0, 10);
	NPC1.gravityAttributes.useGravity = true;
	NPC2.setBoundaryOffsets(10, 23, 0, 10);
	NPC2.gravityAttributes.useGravity = true;
	NPC3.setBoundaryOffsets(10, 23, 0, 10);
	NPC3.gravityAttributes.useGravity = true;
	NPC4.setBoundaryOffsets(10, 23, 0, 10);
	NPC4.gravityAttributes.useGravity = true;
	NPC5.setBoundaryOffsets(10, 23, 0, 10);
	NPC5.gravityAttributes.useGravity = true;

	let floor = new Obstacle(0, 701, 1476, 80, "./images/Floor_wall.png", 1, 1);

	let platform1 = new Obstacle(0, 500, 250, 50, "./images/Platform_wall.png", 1, 1);
	let platform2 = new Obstacle(450, 350, 250, 50, "./images/Platform_wall.png", 1, 1);
	let platform3 = new Obstacle(650, 350, 250, 50, "./images/Platform_wall.png", 1, 1);

	let levelChanger = new LevelChanger(1460, 0, 16, 64);
	levelChanger.level = "level5"


}


function keyEventDown(eventInformation) {
	if (playerFigureObject.isMoving && eventInformation.key !== " ") {
		return;
	}

	switch (eventInformation.key) {
		case "a":
			playerFigureObject.isMoving = true;
			playerFigureObject.moveBy.left = -5,5;
			playerFigureObject.moveBy.top = 0;
			playerFigureObject.startAnimation(11,19);
			playerFigureObject.lookDirection = "left";
			break;
			case "d":
			playerFigureObject.isMoving = true;
			playerFigureObject.moveBy.left = 5,5;
			playerFigureObject.moveBy.top = 0;
			playerFigureObject.startAnimation(1,9);
			playerFigureObject.lookDirection = "right";
			break;
		case "s":
			playerFigureObject.isMoving = true;
			playerFigureObject.moveBy.left = 0;
			playerFigureObject.moveBy.top = 3;
			playerFigureObject.startAnimation(0,0);
			break;
		case  " ":
		if (playerFigureObject.gravityAttributes.midair === false) {
			playerFigureObject.gravityAttributes.antiGravityForce = 190;
			}
			break;
			case "l":
				if (playerFigureObject.lookDirection == "right") {
				   playerFigureObject.startAnimation(25,29);
				}
				else if (playerFigureObject.lookDirection == "left") {
				   playerFigureObject.startAnimation(35,39);
				}
				setTimeout(playerFigureObject.shoot, 300);
			 break;

	}
}

function stopMovement() {
	playerFigureObject.isMoving = false;
	playerFigureObject.moveBy.left = 0;
	playerFigureObject.moveBy.top = -2;
}

function keyEventUp(eventInformation) {
	switch (eventInformation.key) {
		case "a":
			stopMovement();
			playerFigureObject.startAnimation(10,10);
			break;
		case "s":
			stopMovement();
			playerFigureObject.startAnimation(0,0);
			break;
		case "d":
			stopMovement();
			playerFigureObject.startAnimation(0,0);
			break;
	}


}



addEventListener("keydown", keyEventDown);
addEventListener("keyup", keyEventUp);


export {createLevel1, createLevel2, createLevel3, createLevel4, createLevel5,}
