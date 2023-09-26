"use client"
import { Box } from "@chakra-ui/react"
import { Key, useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point, getOtherPosition} from "./gameEngine"
import FirstRaquette from "./FirstRaquette"
import GameSession from "./GameSession"

type Props = {}

export default function Home() {
  
  // const positions: Point[] = getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400);
  // const trajectory: Point[] = getBallTrajectory(positions[0], positions[7], 10)
  // const trajectory2: Point[] = getBallTrajectory(positions[7], positions[4], 10)
  // const trajectory3: Point[] = getBallTrajectory(positions[4], positions[5], 10)
  // const trajectory4: Point[] = getBallTrajectory(positions[5], positions[2], 10)
  // const [Px, setPlayerX] = useState(100);
  // const [Ox, setOtherX] = useState(getOtherPosition({x: 120, y: 200}, {x: 100, y: 100}, {x: Px, y:200}, 100, 60));
  // const table: Point[][] = [trajectory, trajectory2, trajectory3, trajectory4];

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === 'a')
  //   {
  //     if (Px - 10 >= 100)
  //     {
  //       setPlayerX(Px - 10)
  //       setOtherX(getOtherPosition({x: 120, y: 200}, {x: 100, y: 100}, {x: Px - 10, y:200}, 100, 60))
  //     }
  //   }
  //   else if (event.key === 'd')
  //   {
  //     if (Px + 10 <= 200)
  //     {
  //       setPlayerX(Px + 10)
  //       setOtherX(getOtherPosition({x: 120, y: 200}, {x: 100, y: 100}, {x: Px + 10, y:200}, 100, 60))
  //     }
  //   }
  // }
// useEffect(() => {
//     console.log("Px: ", Px)
//     console.log("Ox: ", Ox)
//     window.addEventListener("keydown", handleKeyDown)
//     console.log("is called")
//     return () => {
// 		  window.removeEventListener('keydown', handleKeyDown);
// 		};
//   }, [Px, Ox])
  // console.log(trajectory)
  return (
    <>
    <GameSession></GameSession>
      {/* <Box
        bg={"#fff"}
        position={"absolute"}
        boxSize={"10px"}
        borderRadius={"full"}
        top={600}
        left={Px}
      >    
      </Box>
      <Box
        bg={"#fff"}
        position={"absolute"}
        boxSize={"10px"}
        borderRadius={"full"}
        top={500}
        left={Ox}
      >    
      </Box> */}
    </>
  )
}
