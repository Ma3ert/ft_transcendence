"use client"
import React from 'react'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {Point, checkBounce, getBallTrajectory} from "./gameEngine"

type Props = {
	points: Point[]
	box: number;
	setIndexStart: (n: number) => void;
	setIndexEnd: (n: number) => void;
}

const Ball = ({ points, box, setIndexStart, setIndexEnd }: Props) => {
	const [scale, setScale] = useState(points[0].y / 800)
	const [index, setIndex] = useState(1)
	const [turn, setTurn] = useState(0);
	var boxSize = scale * box
	const handleMovement = () => {
		if (index < points.length - 1)
		{
			setIndex(index + 1);
			setScale(points[index].y / 800)
			boxSize = scale * box
		}
		else
		{
			if (turn === 0)
			{
				setIndexStart(7);
				setIndexEnd(3);
			}
			else if (turn === 1)
			{
				if (checkBounce({x: 270, y: 803}, points[index])) console.log("it bounce");
				setIndexStart(3);
				setIndexEnd(5);
			}
			else if (turn === 2)
			{
				setIndexStart(5);
				setIndexEnd(0);
			}
			else if (turn === 3)
			{
				if (checkBounce({x: 275, y: 803}, points[index])) console.log("it bounce")
				setIndexStart(0);
				setIndexEnd(9);
			}
			setIndex(0);
			setTurn(turn + 1);
		}
	}
	// const handleKeyDown = (event: KeyboardEvent) => {
	// 	if (event.key === "ArrowUp")
	// 	{
	// 		// if (by - 10 > 10)
	// 		// 	setBy(by - 10)
	// 		if (index < points.length)
	// 		{
	// 			setBy(points[index].y)
	// 			setBx(points[index].x)
	// 			console.log(points[index])
	// 			setIndex(index + 1);
	// 		}
	// 		setScale(by / 800)
	// 		boxSize = scale * box
	// 	}
	// 	if (event.key === "ArrowDown")
	// 	{
	// 		// if (by - 10 > 10)
	// 		// 	setBy(by - 10)
	// 		if (index > 0)
	// 		{
	// 			setBy(points[index].y)
	// 			setBx(points[index].x)
	// 			console.log(points[index])
	// 			setIndex(index - 1);
	// 		}
	// 		setScale(by / 800)
	// 		boxSize = scale * box
	// 	}
	// 	else if (event.key === "ArrowDown"){
	// 		if (by + 10 < 1000)
	// 			setBy(by + 10)
	// 		setScale(by / 800)
	// 		boxSize = scale * box
	// 	}
	// 	else if (event.key === "ArrowRight")
	// 	{
	// 		if (bx + 10 < 1000)
	// 			setBx(bx + 10)
	// 	}
	// 	else if (event.key === "ArrowLeft")
	// 	{
	// 		if (bx - 10 > 10)
	// 			setBx(bx - 10)
	// 	}
	// }
	useEffect(() => {
		setTimeout(handleMovement, 60);
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