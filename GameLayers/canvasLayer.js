const canvas = document.querySelector("#canvas");
const canvasContext = canvas.getContext("2d");

let canvasBoundaries = {
    "getTopBoundary": () => {
        return 0;
    },
    "getLeftBoundary": () => {
        return 0;
    },
    "getBottomBoundary": () => {
        return canvas.height;
    },
    "getRightBoundary": () => {
        return canvas.width;
    }
}

export {canvas, canvasBoundaries, canvasContext}