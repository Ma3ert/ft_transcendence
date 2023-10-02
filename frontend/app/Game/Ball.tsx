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
	roomId: string;
}

const Ball = ({ socket, state, points, box, distance, velocity, roomId }: Props) => {
	const [scale, setScale] = useState(points[0].y / 500);
	const [index, setIndex] = useState(1);
	var boxSize = scale * box
	console.log("game State from the ball: ", state);
	const handleMovement = () => {
		console.log("i get here")
		if (state === "gameStarted")
		{
			console.log(points);
			if (index < points.length - 2)
			{
				setIndex(index + 1);
				setScale(points[index].y / 500);
				boxSize = scale * box
			}
			else
			{
				const ballEvent: BallEvent = {room: roomId , event: "ballReachesEnd"}
				socket.emit("ballReachesEnd", ballEvent);
				setIndex(1);
			}
		}
	}
	useEffect(() => {
		setTimeout(handleMovement, distance / velocity);
	});
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