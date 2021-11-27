import React from 'react'
import {useSelector} from "react-redux";
import {MatchHelper} from "../data";
import styled from 'styled-components'

const SingleMapWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  font-family: Roboto;
  font-size: 14px;
`

const SingleMap = ({ mapName, wins, played }) => {
  const name = MatchHelper.getMapName(mapName).replace(/\b\w/g, l => l.toUpperCase())
  return (
    <SingleMapWrapper>
      <div>{name}:</div>
      <div>&nbsp;{played} played,</div>
      <div>&nbsp;{wins} wins</div>
    </SingleMapWrapper>
  )
}

const Maps = () => {
  const maps = useSelector(state => state.stats.maps)
  const sortedByAmountOfPlays = [...maps].sort((a, b) => b.played - a.played)
  return (
    <div>
      <div>Maps</div>
      {sortedByAmountOfPlays.map(map => <SingleMap key={map.mapName} mapName={map.mapName} wins={map.wins} played={map.played}/>)}
    </div>
  )
}

export default Maps