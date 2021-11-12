import React from 'react'
import {useSelector} from "react-redux";
import styled from 'styled-components'

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  &:first-child {
    margin-right: 80px;
  }
`

const Matches = () => {
  const duelStats = useSelector(state => state.stats.duels)
  const tdmStats = useSelector(state => state.stats.tdms)

  return (
    <StatsWrapper>
      <StatWrapper>
        <div>Duels:</div>
        <div>Played: {duelStats?.played}</div>
        <div>Wins: {duelStats?.wins}</div>
        <div>Loses: {duelStats?.loses}</div>
        <div>Time played: {Math.round(duelStats?.played * 8 / 60)} hours</div>
      </StatWrapper>

      <StatWrapper>
        <div>Team DMs:</div>
        <div>Played: {tdmStats?.played}</div>
        <div>Wins: {tdmStats?.wins}</div>
        <div>Loses: {tdmStats?.loses}</div>
        <div>Time played: {Math.round(tdmStats?.played * 10 / 60)} hours</div>
      </StatWrapper>
    </StatsWrapper>
  )
}

export default Matches