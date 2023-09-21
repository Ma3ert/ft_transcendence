import React from 'react'
import Ball from './Ball'
import FirstRaquette from './FirstRaquette'
import { Game, getBallPositions, getBallTrajectory } from './gameEngine'

const player:Game = {
  id: 0,
  playerPosition: {x: 150, y: 200},
  otherPosition: {x: 200 + 120, y: 100},
  bottomLeft: {x: 150, y: 200},
  topLeft: {x: 200, y: 100},
  ballPositions: getBallPositions({x: 150, y: 200}, {x: 200, y: 100}, 200, 120),
  ballTrajectory: [],
  indexStart: 0,
  indexEnd: 7,
  otherPosition: {x:0, y:0},
  state: "R",
  shootingPosition: 7,
  playerDirection: "left",
  playerH: 100,
  playerW: 100,
  playerSrc: "/leftFirstRaquette.png",
  otherDirection: "right",
  otherH: 100,
  otherW: 100,
  otherSrc: "/secondRaquette.png",
  baseLine: 200,
  topLine: 120,
  topLeft: {x: 200, y: 100},
  bottomLeft: {x: 150, y: 200},
  score: 0,
  roomId: "chi haja",
}

const GameSession = (props: Props) => {
  return (
    <Ball></Ball>
    <FirstRaquette></FirstRaquette>
    <SecondRaquette></secondRaquette>
  )
}

export default GameSession