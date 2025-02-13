let startTime;
let previousFrameTime;
let defaultRefreshTime;
let currentRefreshTime;

function startGameClock() {
    previousFrameTime = Date.now();
}

function setDefaultFrameRate(defaultGameFrameRate) {
    defaultRefreshTime = 1000 / defaultGameFrameRate;
}

function setNewTick() {
    let currentTime = Date.now();
    currentRefreshTime =  currentTime - previousFrameTime;
    previousFrameTime = currentTime;
}
function interpolateValueToFPS (value) {
        return Math.round((currentRefreshTime / defaultRefreshTime) * value);
}

function interpolateValueToFPSDecimal (value) {
    return ((currentRefreshTime / defaultRefreshTime) * value);
}

export {startGameClock, setNewTick, setDefaultFrameRate, interpolateValueToFPS, interpolateValueToFPSDecimal}