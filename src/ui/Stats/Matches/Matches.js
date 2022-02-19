import React from 'react'
import { useSelector } from 'react-redux'
import { StatsHeaderWrapper, StatsTextWrapper, StatsWrapper, StatWrapper } from './styles'


const Matches = () => {
  const duelStats = useSelector(state => state?.stats?.duels)
  const tdmStats = useSelector(state => state?.stats?.tdms)

  return (
    <StatsWrapper>
      <StatWrapper>
        <StatsHeaderWrapper>Duels:</StatsHeaderWrapper>
        <StatsTextWrapper>Played: { duelStats?.played }</StatsTextWrapper>
        <StatsTextWrapper>Wins: { duelStats?.wins }</StatsTextWrapper>
        <StatsTextWrapper>Loses: { duelStats?.loses }</StatsTextWrapper>
        <StatsTextWrapper>Time played: { Math.round(duelStats?.played * 8 / 60) } hours</StatsTextWrapper>
      </StatWrapper>

      <StatWrapper>
        <StatsHeaderWrapper>Team DMs:</StatsHeaderWrapper>
        <StatsTextWrapper>Played: { tdmStats?.played }</StatsTextWrapper>
        <StatsTextWrapper>Wins: { tdmStats?.wins }</StatsTextWrapper>
        <StatsTextWrapper>Loses: { tdmStats?.loses }</StatsTextWrapper>
        <StatsTextWrapper>Time played: { Math.round(tdmStats?.played * 10 / 60) } hours</StatsTextWrapper>
      </StatWrapper>
    </StatsWrapper>
  )
}

export default Matches