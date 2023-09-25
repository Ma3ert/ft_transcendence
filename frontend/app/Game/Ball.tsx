"use client"
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { Point } from "./gameEngine"

interface BallEvent {
	room: string; // we've used this one before
	event: string;
}

type Props = {
	socket: Socket;
	points: Point[]
	state: string;
	box: number;
	distance: number;
	velocity: number;
	setIndexStart: (n: number) => void;
	setIndexEnd: (n: number) => void;
}

const Ball = ({ socket, state, points, box, distance, velocity, setIndexStart, setIndexEnd }: Props) => {
	const [scale, setScale] = useState(points[0].y / 500);
	const [index, setIndex] = useState(1);
	// const [turn, setTurn] = useState(0);
	var boxSize = scale * box
	const handleMovement = () => {
		if (state === "gameStarted" && index < points.length - 2)
		{
			setIndex(index + 1);
			setScale(points[index].y /500);
			boxSize = scale * box
		}
		else
		{
			const ballEvent: BallEvent = {room: "chi haja", event: "ballReachesEnd"}
			socket.emit("ballReachesEnd", ballEvent);
			// if (turn === 0)
			// {
			// 	setIndexStart(7);
			// 	setIndexEnd(3);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 1)
			// {
			// 	setIndexStart(3);
			// 	setIndexEnd(5);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 2)
			// {
			// 	setIndexStart(5);
			// 	setIndexEnd(0);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 3)
			// {
			// 	setIndexStart(0);
			// 	setIndexEnd(9);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 4)
			// {
			// 	setIndexStart(9);
			// 	setIndexEnd(1);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 5)
			// {
			// 	setIndexStart(1);
			// 	setIndexEnd(8);
			// 	setTurn(turn + 1);
			// }
			// else if (turn === 6)
			// {
			// 	setIndexStart(8);
			// 	setIndexEnd(0);
			// 	setTurn(turn + 1);
			// }
			// else
			// {
			// 	setIndexStart(0);
			// 	setIndexEnd(7);
			// 	setTurn(0);
			// }
		}
	}
	useEffect(() => {
		setTimeout(handleMovement, distance / velocity);
	}, [box, scale, index]);
  	return (
		<>
			<Box
				bg={"#fff"}
				position={"absolute"}
				top={points[index].y}
				left={points[index].x}
				boxSize={boxSize.toString() + "px"}
				borderRadius={"full"}
				>
			</Box>
		</>
	)
}

export default Ball