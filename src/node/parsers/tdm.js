import Parser from "./parser"

function getTeams(match) {
  const marine = match?.team?.find(q => q?.name?.toLowerCase() === 'marine')
  const strogg = match?.team?.find(q => q?.name?.toLowerCase() === 'strogg')
  const playerMapper = q => ({name: q.name, guid: q.guid})
  return [
    {...marine, players: marine.player.map(playerMapper) },
    {...strogg, players: strogg.player.map(playerMapper) },
  ]
}

function mapTdmData(data) {
  const match = data?.match

  if (!match) {
    return null
  }

  return {
    matchId: String(match?.id),
    isTeamGame: match?.isTeamGame,
    map: match?.map,
    type: match?.type,
    datetime: match?.datetime,
    server: match?.server,
    team: getTeams(match),
    players: Parser.getPlayers([...match?.team?.[0]?.player, ...match?.team?.[1]?.player,])
  }
}

function getTdmData(data) {
  return mapTdmData(data)
}

export default getTdmData
