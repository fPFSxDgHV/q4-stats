import React from "react";
import {MatchData} from "./Duel";
import {useTable} from "react-table";
import {find, map, pipe, prop} from "ramda";
import {flatten} from "ramda";
import {MatchHelper} from "../data";
import DamageHelper from "./damage";

const getTeamData = player => {
  return {
    name: player?.name,
    score: player?.score,
    kills: player?.kills,
    net: player?.net,
    suicides: player?.suicides,
  }
}

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
  return flatten([...teamData.map(getPlayerData)])
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

const OverallData = ({ teamData, type }) => {
  const data = React.useMemo(
    () => getPlayersData(teamData, 'Marine'),
    []
  )

  const columns = React.useMemo(
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data})
  const Table = () => (
    <table {...getTableProps()} style={{border: 'solid 1px blue'}}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )

  return (
    <div>
      <div>{`${type}:`}</div>
      <Table/>
    </div>
  )
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

const Tdm = ({matchData}) => {
  const players = getPlayers(matchData)

  const marine = players.filter(q => q.team === "Marine")
  const strogg = players.filter(q => q.team === "Strogg")

  return (
    <div>
      <MatchData matchData={matchData}/>
      <div>
        <OverallData teamData={marine} type={'Marine'}/>
        <OverallData teamData={strogg} type={'Strogg'}/>
      </div>
    </div>
  )
}

export default Tdm