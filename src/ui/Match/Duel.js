import {DuelHeaderDataWrapper, MatchWrapper, NamesWrapper, NameWrapper, TdWrapper, WeaponImg} from "./styles";
import React from "react";
import {maps, MatchHelper, servers} from "../data";
import {useSelector} from "react-redux";
import {useTable} from "react-table";
import {getEnemyData, getPlayerData} from "../MatchHistory/SingleDuel";
import DamageHelper from "./damage";
import dayjs from "dayjs";
import {mapDateTime} from "../MatchHistory";

const getMapName = (map) => {
  const regex = /mp\/(.*)\.map/
  const mapName = map?.match(regex)?.[1]
  return maps?.find(q => q?.name?.includes(mapName))?.sName || map
}

const calcWeaponDmg = (weaponData, weaponName, playerWeapons) => {
  const _hits = weaponData?.hits
  if (!_hits) {
    return 0
  }
  const hits = Number(_hits)

  if (weaponName === 'Machinegun') {
    return DamageHelper.calcMGdmg(hits)
  }
  if (weaponName === 'LightningGun') {
    return hits * 7
  }
  if (weaponName === 'Railgun') {
    return hits * 90
  }
  if (weaponName === 'HyperBlaster') {
    return hits * 15
  }
  if (weaponName === 'GrenadeLauncher') {
    return hits * 100
  }
  if (weaponName === 'Shotgun') {
    return hits * 10
  }

  if (weaponName === 'RocketLauncher') {
    return DamageHelper.calcRocketDmg(playerWeapons)
  }

  return 0
}

const getWeaponIcon = weaponName => {
  let src = ''
  if (weaponName === 'Railgun') {
    src = 'http://localhost:6007/images/icons/guns/rail.png'
  } else if (weaponName === 'RocketLauncher') {
    src = 'http://localhost:6007/images/icons/guns/rocket.png'
  } else if (weaponName === 'Machinegun') {
    src = 'http://localhost:6007/images/icons/guns/mg.png'
  } else if (weaponName === 'Shotgun') {
    src = 'http://localhost:6007/images/icons/guns/shotgun.png'
  } else if (weaponName === 'HyperBlaster') {
    src = 'http://localhost:6007/images/icons/guns/plasma.png'
  } else if (weaponName === 'GrenadeLauncher') {
    src = 'http://localhost:6007/images/icons/guns/gl.png'
  } else if (weaponName === 'LightningGun') {
    src = 'http://localhost:6007/images/icons/guns/lg.png'
  }

  if (!src) {
    return <div>{`${weaponName} icon`}</div>
  }

  return <WeaponImg src={src} />
}

const getSingeWeaponData = (playerWeapons, enemyWeapons, weaponName) => {
  return {
    hits1: DamageHelper.getHitsOverShots(playerWeapons?.[weaponName]?.hits, playerWeapons?.[weaponName]?.shots),
    acc1: DamageHelper.getGunAcc(playerWeapons?.[weaponName]?.hits, playerWeapons?.[weaponName]?.shots),
    dmg1: calcWeaponDmg(playerWeapons?.[weaponName], weaponName, playerWeapons),
    score1: playerWeapons?.[weaponName]?.kills,
    gunIcon: getWeaponIcon(weaponName),
    score2: enemyWeapons?.[weaponName]?.kills,
    dmg2: calcWeaponDmg(enemyWeapons?.[weaponName], weaponName, enemyWeapons),
    acc2: DamageHelper.getGunAcc(enemyWeapons?.[weaponName]?.hits, enemyWeapons?.[weaponName]?.shots),
    hits2: DamageHelper.getHitsOverShots(enemyWeapons?.[weaponName]?.hits, enemyWeapons?.[weaponName]?.shots),
  }
}

const getTableData = (matchData, guid) => {
  const player = getPlayerData(matchData, guid)
  const enemy = getEnemyData(matchData, guid)
  const playerWeapons = {...player.weapons, dmg: player.damageGiven}
  const enemyWeapons = {...enemy.weapons, dmg: enemy.damageGiven}

  const data = []

  const guns = [
    'Machinegun',
    'Shotgun',
    'HyperBlaster',
    'GrenadeLauncher',
    'RocketLauncher',
    'LightningGun',
    'Railgun'
  ]

  for (const gun of guns) {
    data.push(getSingeWeaponData(playerWeapons, enemyWeapons, gun))
  }

  data.push({
    hits1: 'Overall',
    acc1: '',
    dmg1: player.damageGiven,
    score1: '',
    gunIcon: '',
    score2: '',
    dmg2: enemy.damageGiven,
    acc2: '',
    hits2: '',
  })

  return data
}

export const MatchData = ({ matchData }) => {
  const mapName = getMapName(matchData?.map)
  const serverName = servers[matchData?.server]
  const time = `${dayjs(mapDateTime(matchData?.datetime)).format('MMMM D H:mm')}`

  return (
    <DuelHeaderDataWrapper>
      <div>{matchData?.type}</div>
      <div>{time}</div>
      <div>{matchData.matchId}</div>
      <div>{mapName}</div>
      {serverName && <div>{serverName}</div>}
    </DuelHeaderDataWrapper>
  )
}

const Duel = ({ matchData }) => {
  const guid = useSelector(state => state?.settings?.guid)

  const name = MatchHelper.getPlayerName(matchData, guid)
  const name1 = MatchHelper.getEnemyPlayerName(matchData, guid)
  const score = MatchHelper.getYourScore(matchData, guid)
  const scor1 = MatchHelper.getEnemyScore(matchData, guid)

  return (
    <MatchWrapper>
      <NamesWrapper>
        <NameWrapper>{name}</NameWrapper>
        <NameWrapper>{name1}</NameWrapper>
      </NamesWrapper>
      <NamesWrapper>
        <NameWrapper>{score}</NameWrapper>
        <NameWrapper>{scor1}</NameWrapper>
      </NamesWrapper>
      <MatchData matchData={matchData} />
      <Table matchData={matchData} />
    </MatchWrapper>
  )
}

const Table = ({ matchData }) => {
  const guid = useSelector(state => state?.settings?.guid)

  const data = React.useMemo(
    () => getTableData(matchData, guid),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'HITS',
        accessor: 'hits1', // accessor is the "key" in the data
      },
      {
        Header: 'ACC %',
        accessor: 'acc1',
      },
      {
        Header: 'DMG',
        accessor: 'dmg1',
      },
      {
        Header: 'Score',
        accessor: 'score1',
      },
      {
        Header: '',
        accessor: 'gunIcon',
      },
      {
        Header: 'Score',
        accessor: 'score2',
      },
      {
        Header: 'DMG',
        accessor: 'dmg2',
      },
      {
        Header: 'ACC %',
        accessor: 'acc2',
      },
      {
        Header: 'HITS',
        accessor: 'hits2',
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
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
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
                <TdWrapper
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </TdWrapper>
              )
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default Duel