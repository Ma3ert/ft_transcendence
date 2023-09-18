"use strict";
function getBallPositions(bottomLeft, topLeft, baseLine, topLine) {
    var baseLineSteps = baseLine / 5.0;
    var topLineSteps = topLine / 5.0;
    var shooting = [
        { x: bottomLeft.x , y: bottomLeft.y },
        { x: bottomLeft.x + baseLineSteps, y: bottomLeft.y },
        { x: bottomLeft.x + baseLineSteps * 2, y: bottomLeft.y },
        { x: bottomLeft.x + baseLineSteps * 3, y: bottomLeft.y },
        { x: bottomLeft.x + baseLineSteps * 4, y: bottomLeft.y }
    ];
    var receiving = [
        { x: topLeft.x, y: topLeft.y },
        { x: topLeft.x + topLineSteps, y: topLeft.y },
        { x: topLeft.x + topLineSteps * 2, y: topLeft.y },
        { x: topLeft.x + topLineSteps * 3, y: topLeft.y },
        { x: topLeft.x + topLineSteps * 4, y: topLeft.y },
    ];
    return (shooting.concat(receiving));
}
console.log(getBallPositions({ x: 100, y: 500 }, { x: 200, y: 200 }, 300, 200));
