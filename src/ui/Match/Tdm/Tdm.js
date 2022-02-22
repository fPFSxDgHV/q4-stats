import React from 'react'
import { MatchData } from '../Duel'
import { find, flatten, map, pipe, prop } from 'ramda'
import { MatchHelper } from '../../data'
import DamageHelper from '../damage'
import OverallData from './OverallData'

const getTeamData = player => {
  return {
    name: player?.name,
    score: player?.score,
    kills: player?.kills,
    net: player?.net,
    suicides: player?.suicides,
  }
}




const getTeamDataOverview = (matchData, type) => {
  const guids = pipe(
    find(q => q.name === type),
    prop('player'),
    map(q => q.guid)
  )(matchData.team)

  const players = matchData.players.filter(q => guids.some(guid => guid === q.guid))
  return players.map(player => ({
    name: player?.name,
    score: player?.score,
    kills: player?.kills,
    net: player?.net,
    suicides: player?.suicides,
  }))
}

const getPlayerTeamName = (matchData, guid) => {
  const teams = matchData.team
  return teams.find(team => team.player.some(q => q.guid === guid)).name
}

const getPlayers = (matchData, type) => {
  return map(player => ({
      ...player,
      team: getPlayerTeamName(matchData, player.guid)
    })
    , matchData.players)
}

const Tdm = ({ matchData }) => {
  const players = getPlayers(matchData)

  const marine = players.filter(q => q.team === 'Marine')
  const strogg = players.filter(q => q.team === 'Strogg')

  return (
    <div>
      <MatchData matchData={ matchData }/>
      <div>
        <OverallData teamData={ marine } type={ 'Marine' }/>
        <OverallData teamData={ strogg } type={ 'Strogg' }/>
      </div>
    </div>
  )
}

export default Tdm