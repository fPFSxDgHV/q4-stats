import React, { useState} from 'react'
import {useSelector} from "react-redux";

import SingleDuel from './SingleDuel'
import SingleTDM from "./SingleTdm";
import {MatchHelper} from "../data";

const mapDateTime = datetime => {
  const [date, time] = datetime.split(' ')
  const updatedDate = date.replaceAll('/', '-')
  const updatedTime = time.replaceAll('-', ':')

  return `${updatedDate} ${updatedTime}`
}

const sortMatches = (a, b) => {

  const aDaytime = mapDateTime(a?.datetime)
  const bDaytime = mapDateTime(b?.datetime)
  return  new Date(bDaytime).getTime() - new Date(aDaytime).getTime()
}

const matchesMapper = guid => matchDetails => {
  if (MatchHelper.isDuelMatch(matchDetails)) {
    return <SingleDuel key={matchDetails.matchId} matchData={matchDetails} guid={guid} />
  } else if (MatchHelper.isTdmMatch(matchDetails)) {
    return <SingleTDM key={matchDetails.matchId} matchData={matchDetails} guid={guid} />
  }
}


const MatchHistory = () => {
  const tdm = useSelector(state => state?.tdm?.matches)
  const duel = useSelector(state => state?.duel?.matches)
  const guid = useSelector(state => state?.settings?.guid)

  const sortedMatches = [...duel, ...tdm].sort(sortMatches)
  return (
    <div>
      {sortedMatches?.map(matchesMapper(guid))}
    </div>
  )
}

export default MatchHistory