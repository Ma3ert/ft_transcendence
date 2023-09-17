export interface Point {
	x: number;
	y: number;
}

export function checkDirection(start: number, end: number, position: number, lineLenght: number): string
{
	if (position - start < lineLenght / 2)
		return ("left");
	return ("right");
}

export function checkBounce(playerPosition: Point, ballPosition: Point): boolean
{
	if (playerPosition.x + 20 >= ballPosition.x && playerPosition.x - 20 <= ballPosition.x)
		return (true);
	return (false);
}

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

export function getOtherPosition(topLeft: Point, bottomLeft: Point, playerPosition: Point, baseLine: number, topLine: number): number
{
	const positionPercent: number = playerPosition.x - bottomLeft.x / baseLine * 100;
	var otherPosition: number = topLine - ((positionPercent / 100) * topLine);
	return (otherPosition + topLeft.x);
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
