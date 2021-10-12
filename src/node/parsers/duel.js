import Parser from "./parser"

function mapData(data) {
  const match = data?.match
  if (!match) {
    return null
  }
  return {
    isTeamGame: match?.isTeamGame,
    matchId: String(match?.id),
    map: match?.map,
    datetime: match?.datetime,
    server: match?.server,
    type: match?.type,
    players: Parser.getPlayers(match?.player)
  }
}
function getDuelData(rawData) {
  return mapData(rawData)
}

export default getDuelData
