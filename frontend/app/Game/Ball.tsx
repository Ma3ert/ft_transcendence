import React from 'react'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {Point} from "./gameEngine"

type Props = {
	points: Point[]
	reset: number
}

const Ball = ({ points, reset }: Props) => {
	var box = 100;
	const [scale, setScale] = useState(points[0].y / 800)
	const [index, setIndex] = useState(1)
	const [start, setStart] = useState(reset)
	var boxSize = scale * box
	const handleMovement = () => {
		if (index < points.length - 1 && start === reset)
		{
			setIndex(index + 1);
			setScale(points[index].y / 800)
			boxSize = scale * box
		}
		else {
			setIndex(0)
			setStart(reset)
			
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
		// window.addEventListener('keydown', handleKeyDown);
		// return () => {
		// window.removeEventListener('keydown', handleKeyDown);
		// };
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
			{/* <Box
				position={"absolute"}
				bg={"#000"}
				opacity={"0.15"}
				top={by + bw + (40 * scale)}
				left={bx}
				w={bw * scale}
				h={2}
				borderRadius={"full"}
			>
			</Box> */}
		</>
	)
}

export default Ball