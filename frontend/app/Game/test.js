"use strict";
function getNextStep(current, target, stepSize) {
    const dx = target.x - current.x;
    const dy = target.y - current.y;
    const angle = Math.atan2(dy, dx);
    const xStep = stepSize * Math.cos(angle);
    const yStep = stepSize * Math.sin(angle);
    const newX = current.x + xStep;
    const newY = current.y + yStep;
    return { x: Math.round(newX), y: Math.round(newY) };
}
function getBallTrajectory(start, end) {
    var toAdd = start;
    var toReturn = [];
    while (toAdd.x < end.x && toAdd.y < end.y) {
        toAdd = getNextStep(toAdd, { x: 500, y: 500 }, 5);
        console.log(toAdd.x, toAdd.y)
        toReturn.push(toAdd);
    }
    return (toReturn);
}

var table = getBallTrajectory({ x: 100, y: 100 }, { x: 500, y: 500 })

console.log(table);
console.log(table.length);