import React from 'react'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {Point} from "./gameEngine"

type Props = {
	points: Point[]
}

const Ball = ({points}: Props) => {
	var box = 100;
	const [bx, setBx] = useState(points[0].x)
	const [by, setBy] = useState(points[0].y)
	const [scale, setScale] = useState(by / 800)
	const [index, setIndex] = useState(1)
	console.log("ball rendered up ", index)
	var boxSize = scale * box
	const handleMovement = () => {
		if (index < points.length)
		{
			setIndex(index + 1);
			setBy(points[index].y)
			setBx(points[index].x)
			setScale(by / 800)
			boxSize = scale * box
		}
	}
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "ArrowUp")
		{
			// if (by - 10 > 10)
			// 	setBy(by - 10)
			if (index < points.length)
			{
				setBy(points[index].y)
				setBx(points[index].x)
				console.log(points[index])
				setIndex(index + 1);
			}
			setScale(by / 800)
			boxSize = scale * box
		}
		if (event.key === "ArrowDown")
		{
			// if (by - 10 > 10)
			// 	setBy(by - 10)
			if (index > 0)
			{
				setBy(points[index].y)
				setBx(points[index].x)
				console.log(points[index])
				setIndex(index - 1);
			}
			setScale(by / 800)
			boxSize = scale * box
		}
		else if (event.key === "ArrowDown"){
			if (by + 10 < 1000)
				setBy(by + 10)
			setScale(by / 800)
			boxSize = scale * box
		}
		else if (event.key === "ArrowRight")
		{
			if (bx + 10 < 1000)
				setBx(bx + 10)
		}
		else if (event.key === "ArrowLeft")
		{
			if (bx - 10 > 10)
				setBx(bx - 10)
		}
	}
	useEffect(() => {
		setTimeout(handleMovement, 25);
		// window.addEventListener('keydown', handleKeyDown);
		// console.log("event is fired ", index)
		// console.log("box size: " + boxSize)
		// console.log("scale: " + scale.toString())
		// console.log("y cordination: " + by.toString())
		// console.log("------------------------------")
		// return () => {
		// window.removeEventListener('keydown', handleKeyDown);
		// };
	}, [by, bx, box, scale, index]);
  	return (
		<>
			<Box
				bg={"#fff"}
				position={"absolute"}
				top={by}
				left={bx}
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