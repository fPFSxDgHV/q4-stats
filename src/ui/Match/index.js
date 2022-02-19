import React from 'react'
import { useSelector } from 'react-redux'

import Duel from './Duel'
import Tdm from './Tdm/Tdm'

const Match = () => {
  const matchId = useSelector(state => state?.header).matchId
  const duel = useSelector(state => state?.duel)
  const tdm = useSelector(state => state?.tdm)

  const matchData = [...duel?.matches, ...tdm?.matches]?.find(q => q.matchId === matchId)

  if (matchData.type === 'Duel') {
    return (
      <Duel matchData={ matchData }/>
    )
  } else if (matchData.type === 'Team DM') {
    return <Tdm matchData={ matchData }/>
  }
  return null
}


export default Match