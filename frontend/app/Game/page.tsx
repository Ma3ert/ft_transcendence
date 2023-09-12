"use client"
import { Box } from "@chakra-ui/react"
import { Key, useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point} from "./gameEngine"

type Props = {}

export default function Home() {
  const positions: Point[] = getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400);
  const trajectory: Point[] = getBallTrajectory(positions[0], positions[7], 10)
  const trajectory2: Point[] = getBallTrajectory(positions[7], positions[4], 10)
  const trajectory3: Point[] = getBallTrajectory(positions[4], positions[5], 10)
  const trajectory4: Point[] = getBallTrajectory(positions[5], positions[2], 10)
  const [index, setIndex] = useState(0);
  const table: Point[][] = [trajectory, trajectory2, trajectory3, trajectory4];

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("hoho")
    if (event.key === "ArrowUp")
    {
      console.log("up")
      if (index < 3)
        setIndex(index + 1)
    }
    else if (event.key === "ArrowDown")
    {
      console.log("down")
      if (index > 0)
        setIndex(index - 1)
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    console.log("is called")
    return () => {
		  window.removeEventListener('keydown', handleKeyDown);
		};
  }, [index])
  console.log(trajectory)
  return (
    <>
      {positions.map((point) => (
        <Box
          bg={"#fff"}
          position={"absolute"}
          boxSize={"10px"}
          borderRadius={"full"}
          top={point.y}
          left={point.x}
          >
        </Box>
      ))}
      <Ball points={table[index]} reset={index}/>
    </>
  )
}
