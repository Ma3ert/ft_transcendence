import React from 'react'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {Point} from "./gameEngine"

type Props = {
	points: Point[]
	box: number;
}

const Ball = ({ points, box }: Props) => {
	const [scale, setScale] = useState(points[0].y / 800)
	const [index, setIndex] = useState(1)
	var boxSize = scale * box
	const handleMovement = () => {
		if (index < points.length)
		{
			setIndex(index + 1);
			setScale(points[index].y / 800)
			boxSize = scale * box
		}
		else if (index === points.length)
		{
			// here I have to send to the server that the ball will hit the border
			// if there's a player at that position means it will bounce otherwise
			// a point count to me
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