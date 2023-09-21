import React, { useState } from 'react'
import Ball from './Ball'
import FirstRaquette from './FirstRaquette'
import { Game, Point, getBallPositions, getBallTrajectory, getOtherPosition } from './gameEngine'
import SecondRaquette from './SecondRaquette'
import { Box } from '@chakra-ui/react'

const player:Game = {
  id: 0,
  playerPosition: {x: 270, y: 803},
  otherPosition: {x: 0, y: 339},
  bottomLeft: {x: 270, y: 803},
  topLeft: {x: 460, y: 339},
  ballPositions: getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400),
  ballTrajectory: [],
  indexStart: 0,
  indexEnd: 7,
  state: "R",
  shootingPosition: 7,
  playerDirection: "left",
  playerW: 150,
  playerH: 150,
  playerSrc: "/playerRaquette/leftFirstRaquette.png",
  otherDirection: "right",
  otherW: 80,
  otherH: 80,
  otherSrc: "/playerRaquette/rightFirstRaquette.png",
  baseLine: 900,
  topLine: 400,
  score: 0,
  roomId: "chi haja",
}

const GameSession = () => {
  const [indexEnd, setIndexEnd] = useState(player.indexEnd);
  const [indexStart, setIndexStart] = useState(player.indexStart);
  const [xposition, setXPositions] = useState(player.playerPosition.x)
  console.log("xposition: ", xposition)
  player.playerPosition.x = xposition;
  player.otherPosition.x = getOtherPosition(player.topLeft, player.bottomLeft, player.playerPosition, player.baseLine, player.topLine);
  const trajectory = getBallTrajectory(player.ballPositions[indexStart], player.ballPositions[indexEnd], 10);
  return (
    <>
      {player.ballPositions.map((point) => (
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
      <Ball
        points={trajectory}
        box={100}
        setIndexEnd={(end) => (setIndexEnd(end))}
        setIndexStart={(start) => (setIndexStart(start))}
      />
      <FirstRaquette
        w={player.playerW.toString() + "px"}
        h={player.playerH.toString() + "px"}
        x={player.playerPosition.x}
        y={player.playerPosition.y}
        src={player.playerSrc}
        setxPosition={setXPositions}
      />
      <SecondRaquette
        w={player.otherW.toString() + "px"}
        h={player.otherH.toString() + "px"}
        x={player.otherPosition.x}
        y={player.otherPosition.y}
        src={player.otherSrc}
      />
    </>
  )
}

export default GameSession