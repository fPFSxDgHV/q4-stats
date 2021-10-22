import React, { useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import SingleDuel from './SingleDuel'
import SingleTDM from "./SingleTdm";
import {MatchHelper} from "../data";
import {changeMatchHistoryFilter} from "../Settings/reducer";

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

const handleFilterChange = dispatch => (event) => dispatch(changeMatchHistoryFilter(event?.target?.value))


const MatchHistory = () => {
  const dispatch = useDispatch()

  const tdm = useSelector(state => state?.tdm?.matches)
  const duel = useSelector(state => state?.duel?.matches)
  const guid = useSelector(state => state?.settings?.guid)
  const filter = useSelector(state => state?.settings?.matchHistoryFilter)

  const matches = []

  if (filter === 'all') {
    matches.push(...duel, ...tdm)
  } else if (filter === 'duels') {
    matches.push(...duel)
  } else if (filter === 'tdms') {
    matches.push(...tdm)
  }


  const sortedMatches = matches.sort(sortMatches)
  return (
    <div>
      <div>
        <select value={filter} onChange={handleFilterChange(dispatch)}>
          <option value={'all'} >All</option>
          <option value={'duels'} >Duels</option>
          <option value={'tdms'} >Tdms</option>
        </select>
      </div>
      {sortedMatches?.map(matchesMapper(guid))}
    </div>
  )
}

export default MatchHistory