"use client"
import { Box } from "@chakra-ui/react"
import { Key, useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point} from "./gameEngine"

type Props = {}

export default function Home() {
  const positions: Point[] = getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400);
  const trajectory: Point[] = getBallTrajectory(positions[0], positions[9], 40)
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
      {trajectory.map((point) => (
        <Box
        bg={"#fff"}
        pos={"absolute"}
        boxSize={"5px"}
        borderRadius={"full"}
        top={point.y}
        left={point.x}
        >
        </Box>
      ))}
    </>
  )
}