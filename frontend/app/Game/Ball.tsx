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
	xBall: number;
	yBall: number;
	state: string;
	ballSize: number;
	roomId: string;
}

const Ball = ({ socket, state, xBall, yBall, ballSize}: Props) => {
  	return (
		<>
			<Box
				bg={"#fff"}
				position={"absolute"}
				top={yBall}
				left={xBall}
				boxSize={ballSize}
				borderRadius={"full"}
				>
			</Box>
		</>
	)
}

export default Ball