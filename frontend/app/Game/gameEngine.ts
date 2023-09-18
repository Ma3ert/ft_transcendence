interface point {
	x: number;
	y: number;
}

function getNextStep(current:point, target:point, stepSize:number) {
	const dx: number = target.x - current.x;
	const dy: number = target.y - current.y;
	const angle: number = Math.atan2(dy, dx);

	const xStep: number = stepSize * Math.cos(angle);
	const yStep: number = stepSize * Math.sin(angle);

	const newX: number = current.x + xStep;
	const newY: number = current.y + yStep;

	return { x: newX, y: newY };
}

function getBallTrajectory(start: point, end: point): point[]
{
	var toAdd:point = start;
	var toReturn:point[] = [];
	while (toAdd.x < end.x && toAdd.y < end.y)
	{
		toAdd = getNextStep(toAdd, {x: 500, y:500}, 10);
		toReturn.push(toAdd);
	}
	return (toReturn);
}

console.log(getBallTrajectory({x: 100, y:100}, {x: 500, y:500}));