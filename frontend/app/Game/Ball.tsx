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
	// const [x, setX] = useState(xBall)
	// const [y, setY] = useState(yBall)
	// const [ySpeed, ySpeedSet] = useState(-2)
	// const [xSpeed, xSpeedSet] = useState(0.4)
	// if (y < 10 && y > 0)
	// {
	// 	console.log("I reach the wall", y)
	// 	console.log("y speed", ySpeed)

	// }
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (y + ySpeed > 350 - 20 || y + ySpeed <= 1)
	// 		{
	// 			setY(y + (ySpeed * -1))
	// 			ySpeedSet(ySpeed * -1)
	// 		}
	// 		else 
	// 			setY(y + ySpeed)
	// 		setX(x + xSpeed)
	// 		}, 15)
	// })
  	return (
		<Box
			bg={"#fff"}
			position={"absolute"}
			top={yBall}
			left={xBall}
			boxSize={ballSize}
			borderRadius={"full"}
			>
		</Box>
	)
}

export default Ball