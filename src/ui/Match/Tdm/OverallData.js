import React from 'react'
import { flatten } from 'ramda'

import { TdmDataWrapper } from './styles'
import { MatchHelper } from '../../data'

import DamageHelper from '../damage'
import Table from './Table'


const getScoreHeaders = (player) => {
  return MatchHelper.getNameFromGuids(player.guid, player.name)
}

const getSingleDamageData = (weaponName, weaponData) => {
  return {
    col1: weaponName,
    col2: weaponData.kills,
    col3: 0,
    col4: DamageHelper.getHitsOverShots(weaponData.hits, weaponData.shots),
    col5: DamageHelper.getGunAcc(weaponData.hits, weaponData.shots)
  }
}

const getPlayerData = (player) => {
  const result = []

  const scoreHeaders = {
    col1: getScoreHeaders(player),
    col2: 'net',
    col3: 'kills',
    col4: 'score',
    col5: 'suicides'
  }

  const scoreData = {
    col1: '',
    col2: player.net,
    col3: player.kills,
    col4: player.score,
    col5: player.suicides,
  }

  const damageHeaders = {
    col1: 'Weapons',
    col2: 'kills',
    col3: 'dmg',
    col4: 'hits',
    col5: 'acc'
  }
  result.push(scoreHeaders, scoreData, damageHeaders)


  for (const [key, value] of Object.entries(player.weapons)) {
    result.push(getSingleDamageData(key, value))
  }


  const rocket = {
    col1: 'Rocket',
    col2: '5',
    col3: '4000',
    col4: '60/100',
    col5: '60 %'
  }

  return result
}

const getPlayersData = (teamData) => {
  // console.log(teamData.map(getPlayerData))
  return teamData.map(getPlayerData)
}

const getColumnsData = teamData => React.useMemo(
  () => getPlayersData(teamData, 'Marine'),
  []
)

const getColumns = () => React.useMemo(
  () => [
    {
      Header: '',
      accessor: 'col1',
    },
    {
      Header: '',
      accessor: 'col2',
    },
    {
      Header: '',
      accessor: 'col3',
    },
    {
      Header: '',
      accessor: 'col4',
    },
    {
      Header: '',
      accessor: 'col5',
    },
  ],
  []
)

const OverallData = ({ teamData, type }) => {

  const data = getColumnsData(teamData)
  console.log(data)
  const columns = getColumns()

  return (
    <TdmDataWrapper>
      {data.map(q => <Table type={type} data={q} columns={columns} />)}
    </TdmDataWrapper>
  )
}

export default OverallData