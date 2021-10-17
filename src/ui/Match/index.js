import React from 'react'
import { findMapImage, getPlayerData, getEnemyData } from '../MatchHistory/SingleDuel'
import {useSelector} from "react-redux";
import {DuelHelper, maps} from "../data";
import { useTable } from 'react-table'
import styled from 'styled-components'

const getMapName = (map) => {
  const regex = /mp\/(.*)\.map/
  const mapName = map?.match(regex)?.[1]
  return maps.find(q => q?.name?.includes(mapName)).sName
}

const getHitsOverShots = (_hits, _shots) => {
  const hits = _hits ? _hits : 0
  const shots = _shots ? _shots : 0


  return `${hits}/${shots}`
}

const getGunAcc = (_hits, _shots) => {
  if (_shots === 0 || _hits === undefined || _shots === undefined) {
    return `0 %`
  }

  const hits = _hits ? _hits : 0
  const shots = _shots ? _shots : 0

  return `${Math.round(hits / shots * 100)} %`
}

const WeaponImg = styled.img`
  width: 24px;
  height: 24px;
`

const getWeaponIcon = weaponName => {
  let src = ''
  if (weaponName === 'Railgun') {
    src = 'http://localhost:6007/images/icons/rail.jpg'
  } else if (weaponName === 'RocketLauncher') {
    src = 'http://localhost:6007/images/icons/rocket.jpg'
  } else if (weaponName === 'Machinegun') {
    src = 'http://localhost:6007/images/icons/mg.png'
  } else if (weaponName === 'Shotgun') {
    src = 'http://localhost:6007/images/icons/shotgun.png'
  } else if (weaponName === 'HyperBlaster') {
    src = 'http://localhost:6007/images/icons/plasma.png'
  } else if (weaponName === 'GrenadeLauncher') {
    src = 'http://localhost:6007/images/icons/gl.png'
  } else if (weaponName === 'LightningGun') {
    src = 'http://localhost:6007/images/icons/lg.png'
  }

  if (!src) {
    return <div>{`${weaponName} icon`}</div>
  }

  return <WeaponImg src={src} />
}

const getSingeWeaponData = (playerWeapons, enemyWeapons, weaponName) => {
  return {
    hits1: getHitsOverShots(playerWeapons?.[weaponName]?.hits, playerWeapons?.[weaponName]?.shots),
    acc1: getGunAcc(playerWeapons?.[weaponName]?.hits, playerWeapons?.[weaponName]?.shots),
    dmg1: calcWeaponDmg(playerWeapons?.[weaponName], weaponName, playerWeapons),
    score1: playerWeapons?.[weaponName]?.kills,
    gunIcon: getWeaponIcon(weaponName),
    score2: enemyWeapons?.[weaponName]?.kills,
    dmg2: calcWeaponDmg(enemyWeapons?.[weaponName], weaponName, enemyWeapons),
    acc2: getGunAcc(enemyWeapons?.[weaponName]?.hits, enemyWeapons?.[weaponName]?.shots),
    hits2: getHitsOverShots(enemyWeapons?.[weaponName]?.hits, enemyWeapons?.[weaponName]?.shots),
  }
}

const calcRocketDmg = (playerWeapons) => {
  let dmg = Number(playerWeapons.dmg)
  console.log(dmg)
  for (const [gunName, gunData] of Object.entries(playerWeapons)) {
    if (gunName === 'dmg') {
      continue
    }
    const hits = Number(gunData.hits)

    if (gunName === 'Machinegun') {
      dmg-= hits * 7
    }
    if (gunName === 'LightningGun') {
      dmg-=  hits * 7
    }
    if (gunName === 'Railgun') {
      dmg-= hits * 90
    }

    console.log(gunName, gunData)
  }

  return dmg
}


const calcWeaponDmg = (weaponData, weaponName, playerWeapons) => {
  const _hits = weaponData?.hits
  if (!_hits) {
    return 0
  }
  const hits = Number(_hits)

  if (weaponName === 'Machinegun') {
    return hits * 7
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
    return calcRocketDmg(playerWeapons)
  }

  return 0
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
                <td
                  {...cell.getCellProps()}
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
}

const Match = () => {
  const matchId = useSelector(state => state?.header).matchId
  const duel = useSelector(state => state?.duel)
  const guid = useSelector(state => state?.settings?.guid)

  const matchData = duel?.matches?.find(q => q.matchId === matchId)
  const mapName = getMapName(matchData?.map)

  return (
    <MatchWrapper>
      <div>{'Duel'}</div>
      <div>{matchData.matchId}</div>
      <div>{mapName}</div>
      <div>{'Moscow'}</div>
      <div>
        <NamesWrapper>
          <NameWrapper>{DuelHelper.getPlayerName(matchData, guid)}</NameWrapper>
          <SpaceBetweenNames></SpaceBetweenNames>
          <div>{DuelHelper.getEnemyPlayerName(matchData, guid)}</div>
        </NamesWrapper>
        <Table matchData={matchData} />
      </div>
    </MatchWrapper>
  )
}

const SpaceBetweenNames = styled.div`
  width: 26px;
`

const NamesWrapper = styled.div`
  display: flex;

`

const NameWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 195px;
`

const MatchWrapper = styled.div`
  font-family: Roboto;
`

export default Match