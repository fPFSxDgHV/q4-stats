import {guids, maps, MatchHelper} from "../data";
import React from "react";
import {setMatch} from "../Header/reducer";
import {useDispatch} from "react-redux";
import {SingleMatchDataWrapper, SingleMatchWrapper, TdmNamesWrapper} from "./styles";


export const findMapImage = map => {
  const regex = /mp\/(.*)\.map/
  const mapName = map?.match(regex)?.[1]
  const result = maps.find(q => q.name.includes(mapName))

  return `${result?.image}`
}

const handleOpenMatchClick = (dispatch, matchId) => () => {
  if (!matchId) {
    return
  }
  dispatch(setMatch(matchId))
}

export const getPlayerData = (matchData, guid) => matchData?.players?.find(q => q?.guid?.toLowerCase() === guid?.toLowerCase())
export const getEnemyData = (matchData, guid) => matchData?.players?.find(q => q.guid?.toLowerCase() !== guid?.toLowerCase())

const mapReducer = (acc, curr) => {
  acc += `${MatchHelper.getNameFromGuids(curr.guid, curr.name)}, `
  return acc
}

const SingleTDM = ({matchData, guid}) => {
  const marine = matchData?.team?.find(q => q.name === 'Marine')
  const strogg = matchData?.team?.find(q => q.name === 'Strogg')
  const marineNames = marine?.players?.reduce(mapReducer, '').replace(/, $/, '')
  const stroggNames = strogg?.players?.reduce(mapReducer, '').replace(/, $/, '')

  const dispatch = useDispatch()

  const _player = getPlayerData(matchData, guid)
  const _enemy = getEnemyData(matchData, guid)
  const player = _player ? _player : matchData?.players?.[0]
  const enemy = _player ? _enemy : matchData?.players?.[1]

  const areYouWinningSon = player.score > enemy.score
  return (
    <SingleMatchWrapper areYouWinningSon={areYouWinningSon}
                        onClick={handleOpenMatchClick(dispatch, matchData?.matchId)}>
      <SingleMatchDataWrapper>
        <div>{'TDM'}</div>
        <TdmNamesWrapper>
          <div>{marineNames}</div>
          <div>{'vs'}</div>
          <div>{stroggNames}</div>
        </TdmNamesWrapper>
        <div>
          <div>{`${marine?.score} : ${strogg?.score}`}</div>
        </div>
      </SingleMatchDataWrapper>
    </SingleMatchWrapper>
  )
}

export default SingleTDM