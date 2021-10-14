import React, { useState} from 'react'
import {useSelector} from "react-redux";

import SingleDuel from './SingleDuel'
import dayjs from "dayjs";

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


const MatchHistory = () => {
  const tdm = useSelector(state => state?.tdm?.matches)
  const duel = useSelector(state => state?.duel?.matches)
  const guid = useSelector(state => state?.settings?.guid)

  console.log(tdm, duel, guid)

  const sortedMatches = [...duel].sort(sortMatches)
  console.log(sortedMatches.map(q => q.datetime))
  return (
    <div>
      {sortedMatches?.map(q => <SingleDuel key={q.matchId} matchData={q} guid={guid} />)}
    </div>
  )
}

export default MatchHistory