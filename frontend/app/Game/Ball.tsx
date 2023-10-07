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
	xBall: number;
	yBall: number;
	state: string;
	ballSize: string;
	roomId: string;
}

const Ball = ({ state, xBall, yBall, ballSize}: Props) => {
	const [x, setX] = useState(xBall)
	const [y, setY] = useState(yBall)
	const [ySpeed, ySpeedSet] = useState(-2)
	const [xSpeed, xSpeedSet] = useState(0.2)
	useEffect(() => {
		setTimeout(() => {
			// if (y > 350 || y < 0)
			// {
			// 	ySpeedSet(ySpeed * -1)
			// }
			// setX(x + xSpeed)
			// setY(y + ySpeed)
		}, 15)
	})
  	return (
		<Box
			bg={"#fff"}
			position={"absolute"}
			top={y}
			left={x}
			boxSize={ballSize}
			borderRadius={"full"}
			>
		</Box>
	)
}

export default Ball