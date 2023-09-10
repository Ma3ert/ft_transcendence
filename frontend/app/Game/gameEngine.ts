export interface Point {
	x: number;
	y: number;
}

function getNextStep(current:Point, target:Point, stepSize:number) {
	const dx: number = target.x - current.x;
	const dy: number = target.y - current.y;
	const angle: number = Math.atan2(dy, dx);

	const xStep: number = stepSize * Math.cos(angle);
	const yStep: number = stepSize * Math.sin(angle);

	const newX: number = current.x + xStep;
	const newY: number = current.y + yStep;

	return { x: newX, y: newY };
}

export function getBallTrajectory(start: Point, end: Point): Point[]
{
	var toAdd:Point = start;
	var toReturn:Point[] = [];
	while (toAdd.x !== end.x && toAdd.y !== end.y)
	{
		toAdd = getNextStep(toAdd, {x: 500, y:500}, 10);
		toReturn.push(toAdd);
	}
	return (toReturn);
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