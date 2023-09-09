import React from 'react'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Decimal } from 'decimal.js';

type Props = {}

const Ball = (props: Props) => {
	var box = 100;
	const [bx, setBx] = useState(500)
	const [by, setBy] = useState(900)
	const [scale, setScale] = useState(by / 800)
	var boxSize = scale * box
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "ArrowUp")
		{
			if (by - 10 > 10)
				setBy(by - 10)
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
		window.addEventListener('keydown', handleKeyDown);
		// console.log("box size: " + boxSize)
		// console.log("scale: " + scale.toString())
		// console.log("y cordination: " + by.toString())
		// console.log("------------------------------")
		return () => {
		window.removeEventListener('keydown', handleKeyDown);
		};
	}, [by, bx, box, scale]);
  	return (
		<>
			<Box
				top={"10px"}
				position={"absolute"}
				w={"100px"}
				h={"10px"}
				bg={"#fff"}
			>
			</Box>
			<Box
				top={"1000px"}
				position={"absolute"}
				w={"100px"}
				h={"10px"}
				bg={"#fff"}
			>
			</Box>
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