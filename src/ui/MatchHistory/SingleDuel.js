import {MatchHelper, guids, maps} from "../data";
import React from "react";
import { setMatch} from "../Header/reducer";
import {useDispatch} from "react-redux";
import {AgainstWrapper, ResultsWrapper, SingleMatchDataWrapper, SingleMatchWrapper} from "./styles";
import {changeMainWidget} from "../Settings/reducer";


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
  dispatch(changeMainWidget('match'))
}

export const getPlayerData = (matchData, guid) => matchData?.players?.find(q => q?.guid?.toLowerCase() === guid?.toLowerCase())
export const getEnemyData = (matchData, guid) => matchData?.players?.find(q => q.guid?.toLowerCase() !== guid?.toLowerCase())


const SingleDuel = ({matchData, guid}) => {
  const dispatch = useDispatch()

  const _player = getPlayerData(matchData, guid)
  const _enemy = getEnemyData(matchData, guid)
  const player = _player ? _player : matchData?.players?.[0]
  const enemy = _player ? _enemy : matchData?.players?.[1]

  const areYouWinningSon = player.score > enemy.score
  const mapImage = findMapImage(matchData?.map)
  const mapSrc = `http://localhost:6007/images/maps/${mapImage}`
  const enemyName = guids[enemy.guid] || MatchHelper.clearRBGcolors(enemy?.name?.slice(0, 20))
  return (
    <SingleMatchWrapper areYouWinningSon={areYouWinningSon}
                        onClick={handleOpenMatchClick(dispatch, matchData?.matchId)}>
      <SingleMatchDataWrapper>
        <div>{'Duel'}</div>
        <AgainstWrapper>{`vs ${enemyName}`}</AgainstWrapper>
        <ResultsWrapper areYouWinningSon={areYouWinningSon}>
          <div>{areYouWinningSon ? 'Victory' : 'Defeat'}</div>
          <div>{`${player?.score} : ${enemy?.score}`}</div>
        </ResultsWrapper>
      </SingleMatchDataWrapper>
    </SingleMatchWrapper>
  )
}

export default SingleDuel