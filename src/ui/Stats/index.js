import React, {useState} from 'react'
import styled from 'styled-components'
import Matches from "./Matches/Matches";
import Maps from "./Maps";

const HeaderWrapper = styled.div`
  font-family: Open_Sans;
  display: flex;
  flex-direction: row;
  font-size: 19px;
`

const StatsWrapper = styled.div`
  font-family: Roboto;
  font-size: 14px;
`

const SingleStat = styled.div`
  cursor: pointer;
  margin-right: 10px;
`

const WidgetWrapper = styled.div`
  margin-top: 40px;
  min-width: 350px;
`

const statsWidgets = {
  matches: <Matches />,
  players: <div>Also soon...</div>,
  maps: <Maps />,
}

const Stats = () => {
  const [stat, changeStat] = useState('matches')

 return (
   <StatsWrapper>
     <HeaderWrapper>
       <SingleStat onClick={() => changeStat('matches')}>Matches</SingleStat>
       <SingleStat onClick={() => changeStat('maps')}>Maps</SingleStat>
       <SingleStat onClick={() => changeStat('players')}>Players</SingleStat>
     </HeaderWrapper>

     <WidgetWrapper>
       {statsWidgets[stat]}
     </WidgetWrapper>
   </StatsWrapper>
 )
}

export default Stats