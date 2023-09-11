export interface Point {
	x: number;
	y: number;
}

// function getNextStep(current:Point, target:Point, stepSize:number) {
// 	const dx: number = target.x - current.x;
// 	const dy: number = target.y - current.y;
// 	const angle: number = Math.atan2(dy, dx);

// 	const xStep: number = stepSize * Math.cos(angle);
// 	const yStep: number = stepSize * Math.sin(angle);

// 	const newX: number = current.x + xStep;
// 	const newY: number = current.y + yStep;

// 	return { x: newX, y: newY };
// }

// export function getBallTrajectory(start: Point, end: Point): Point[]
// {
// 	var toAdd:Point = start;
// 	var toReturn:Point[] = [];
// 	while (toAdd.x !== end.x && toAdd.y !== end.y)
// 	{
// 		toAdd = getNextStep(toAdd, {x: 500, y:500}, 10);
// 		toReturn.push(toAdd);
// 	}
// 	return (toReturn);
// }

export function getBallTrajectory(start: Point, end: Point, step: number): Point[] {
    const points: Point[] = [];
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    const sx = start.x < end.x ? 1 : -1;
    const sy = start.y < end.y ? 1 : -1;
    let err = dx - dy;
	var count = step;

    let x = start.x;
    let y = start.y;

    while (true) {
		count -= 1;
		if (count === 0)
		{
        	points.push({ x, y });
			count = step;
		}

        if (x === end.x && y === end.y) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x += sx;
        }

        if (e2 < dx) {
            err += dx;
            y += sy;
        }
    }

    return points;
}

export function getBallPositions(bottomLeft: Point, topLeft: Point, baseLine: number, topLine: number): Point[]
{
	var baseLineSteps: number = baseLine / 5.0;
	var topLineSteps: number = topLine / 5.0;
	var shooting : Point[] = [
		{x: bottomLeft.x, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 2, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 3, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 4, y: bottomLeft.y}
	]
	var receiving : Point[] = [
		{x: topLeft.x, y: topLeft.y},
		{x: topLeft.x + topLineSteps, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 2, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 3, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 4, y: topLeft.y}
	]
	return (shooting.concat(receiving))
}

// console.log(getBallPositions({x: 100, y: 500}, {x: 200, y: 200}, 300, 200));