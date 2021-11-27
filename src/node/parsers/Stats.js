import {MatchHelper} from "../../ui/data";
import {MatchData} from "../../ui/Match/Duel";
import DB from "../../ui/db";

export class MatchStats {
  static processMatches(duels, guid, type) {
    const data = {}
    duels.forEach(duel => {
      const mapName = duel?.map
      const won = type === 'duel' ? MatchHelper.wasDuelWon(duel, guid) : MatchHelper.wasTdmWon(duel, guid)
      if (!data[mapName]) {
        data[mapName] = {
          played: 1,
          wins: won ? 1 : 0
        }
      } else {
        data[mapName].played = data[mapName].played + 1
        if (won) {
          data[mapName].wins = data[mapName].wins + 1
        }
      }
    })

    return data
  }

  static getData(duels, tdms, guid) {
    const data = {
      ...MatchStats.processMatches(tdms, guid, 'tdms'),
      ...MatchStats.processMatches(duels, guid, 'duel'),
    }

    return data
  }

  static mapData(data) {
    const result = []

    for (const [key, value] of Object.entries(data)) {
      const data = {
        mapName: key,
        ...value
      }
      result.push(data)
    }

    return result
  }

  static async processData(duels, tdms, guid) {
    const mapData = MatchStats.getData(duels, tdms, guid)
    const data = MatchStats.mapData(mapData)

    await DB.addMatchStats(data)
  }
}