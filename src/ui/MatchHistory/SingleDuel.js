import {guids, maps} from "../data";
import React from "react";
import styled from "styled-components";


const ImgWrapper = styled.img`
  height: 100px;
  width: 250px;
  object-fit: cover;
`

const SingleMatchDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const findMapImage = map => {
  const regex = /mp\/(.*)\.map/
  const mapName = map?.match(regex)?.[1]
  const result = maps.find(q => q.name.includes(mapName))

  return `${result?.image}`
}

const LeftSquare = styled.div`
  height: 100%;
  width: 5px;
  ${({ areYouWinningSon }) => areYouWinningSon ? 'background: #4b7b91;' : 'background: #836789;'}
`

const AgainstWrapper = styled.div`
  margin-left: 20px;
`

const SingleDuelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 700px;
  align-items: center;
  margin-top: 10px;
  
  color: white;
  font-family: Roboto;
  
  ${({ areYouWinningSon }) => areYouWinningSon ? 'background: #559999;' : 'background: #b05e6c;'}
  cursor: pointer;
`

const SingleDuel = ({ matchData, guid }) => {
  const player = matchData?.players?.find(q => q.guid === guid)
  const enemy = matchData?.players?.find(q => q.guid !== guid)
  const areYouWinningSon = player.score > enemy.score
  const mapImage = findMapImage(matchData?.map)
  const mapSrc = `http://localhost:6007/images/maps/${mapImage}`
  const enemyName = guids[enemy.guid] || enemy?.name?.slice(0, 20)
  console.log(guids[enemy.guid])
  return (
    <SingleDuelWrapper areYouWinningSon={areYouWinningSon}>
      <LeftSquare areYouWinningSon={areYouWinningSon} />
      <SingleMatchDataWrapper>
        <AgainstWrapper>{`vs ${enemyName}`}</AgainstWrapper>
        <div>
          <div>{areYouWinningSon ? 'Victory' : 'Defeat'}</div>
          <div>{`${player?.score} : ${enemy?.score}`}</div>
        </div>
        <ImgWrapper src={mapSrc} />
      </SingleMatchDataWrapper>
    </SingleDuelWrapper>
  )
}

export default SingleDuel