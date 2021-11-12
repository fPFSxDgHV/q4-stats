import {connection} from "./jsstore_con";

const settingsTable = {
  name: 'Settings',
  columns: {
    id: {primaryKey: true, autoIncrement: true},
    statsPath: {dataType: 'string'},
    language: {dataType: 'string', default: 'english', notNull: true},
    guid: {dataType: 'string'}
  }
}

const duelTable = {
  name: 'Duel',
  columns: {
    id: {primaryKey: true, autoIncrement: true},
    type: {dataType: 'string'},
    isTeamGame: {dataType: 'boolean'},
    matchId: {dataType: 'string', unique: true},
    map: {dataType: 'string', notNull: true},
    datetime: {dataType: 'string', notNull: true},
    server: {dataType: 'string'},
    players: [
      {
        name: {dataType: 'string'},
        clan: {dataType: 'string'},
        guid: {dataType: 'string'},
        score: {dataType: 'number'},
        kills: {dataType: 'number'},
        suicides: {dataType: 'number'},
        net: {dataType: 'number'},
        damageGiven: {dataType: 'number'},
        damageTaken: {dataType: 'number'},
        awards: [
          {
            name: {dataType: 'string'},
            value: {dataType: 'string'},
          }
        ],
        weapons: {
          Machinegun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          Shotgun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          HyperBlaster: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          GrenadeLauncher: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          RocketLauncher: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          Railgun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
          LightningGun: {
            hits: {dataType: 'number'},
            shots: {dataType: 'number'},
            kills: {dataType: 'number'},
          },
        }
      }],
  }
}

const tdmTable = {
  name: 'Team DM',
  columns: {
    ...duelTable.columns,
    team: [{
      name: {dataType: 'string'},
      score: {dataType: 'string'},
      players: [
        {
          name: {dataType: 'string'},
          guid: {dataType: 'string'},
        }
      ]
    }]
  }
}

const duelMatchesStats = {
  name: 'DuelStats',
  columns: {
    played: {dataType: 'number'},
    wins: {dataType: 'number'},
    loses: {dataType: 'number'},
  }
}

const tdmMatchesStats = {
  name: 'TdmStats',
  columns: {
    played: {dataType: 'number'},
    wins: {dataType: 'number'},
    loses: {dataType: 'number'},
  }
}


class DB {
  static async addDuelStats(stats) {
    const numberOfRowsInserted = await connection.insert({
      into: duelMatchesStats.name,
      values: [stats]
    })
  }

  static async addTdmStats(stats) {
    const numberOfRowsInserted = await connection.insert({
      into: tdmMatchesStats.name,
      values: [stats]
    })
  }

  static async addOverallStats({duels, tdms}) {
    await DB.addDuelStats(duels)
    await DB.addTdmStats(tdms)
  }

  static async addDuel(duelData) {
    const numberOfRowsInserted = await connection.insert({
      into: 'Duel',
      values: [duelData]
    })
  }

  static async initSettings() {
    const settings = await connection.select({
      from: 'Settings'
    })

    if (settings.length === 0) {
      const numberOfRowsInserted = await connection.insert({
        into: 'Settings',
        values: [{
          statsPath: '',
          language: 'english',
          guid: ''
        }]
      })

    }
  }

  static async init() {
    const database = {
      name: 'app',
      tables: [settingsTable, duelTable, tdmTable, duelMatchesStats, tdmMatchesStats],
      version: 2,
    }

    const isDbCreated = await connection.initDb(database);
    // isDbCreated will be true when database will be initiated for first time

    if (isDbCreated) {
      console.log('Db Created & connection is opened');
    } else {
      console.log('Connection is opened');
    }

    await DB.initSettings()
  }

  static async getSettings() {
    const settings = await connection.select({
      from: settingsTable.name
    })

    return settings?.[0]
  }

  static async getStatsPath() {
    const settings = await DB.getSettings()
    return settings?.statsPath
  }

  static async updateStatsPath(newPath) {
    await connection.update({
      in: 'Settings',
      set: {
        statsPath: newPath
      }
    })
  }

  /*
   * filter out matches that already in db
   * @param {Array} duels
   * @param {string} type - type of filter(duel or tdm)
   */
  static async filterMatches(matches, type = 'duel') {
    const matchesInDb = type === 'duel' ? await DB.getDuels() : await DB.getTdms()
    const idOfMatchesInDB = matchesInDb.map(q => q?.matchId).map(q => q)
    return matches.filter(q => !idOfMatchesInDB.some(idInDb => q.matchId === idInDb))
  }

  static async insertDuels(duels) {
    const filteredDuels = await DB.filterMatches(duels, 'duel')
    if (filteredDuels.length === 0) {
      return
    }
    const r = await connection.insert({
      into: duelTable.name,
      values: [...filteredDuels]
    })

    if (r > 0) {
      console.log(`inserted ${r} values`)
    }
  }

  static async insertTdms(tdms) {
    const filteredDuels = await DB.filterMatches(tdms, 'tdm')
    const r = await connection.insert({
      into: tdmTable.name,
      values: [...filteredDuels]
    })

    if (r > 0) {
      console.log(`inserted ${r} values`)
    }
  }

  static async getDuels() {
    return await connection.select({
      from: duelTable.name
    })
  }

  static async getTdms() {
    return await connection.select({
      from: tdmTable.name
    })
  }

  static async getDuelStats() {
    return await connection.select({
      from: duelMatchesStats.name
    })
  }

  static async getTdmStats() {
    return await connection.select({
      from: tdmMatchesStats.name
    })
  }

  static async updateGuid(newGuid) {
    await connection.update({
      in: settingsTable.name,
      set: {
        guid: newGuid
      }
    })
  }

  static async clearDB() {
    try {
      for (const table of [settingsTable, duelTable, tdmTable, duelMatchesStats, tdmMatchesStats]) {
        await connection.clear(table.name)
      }
      console.log('db dropped')
    } catch (e) {
      console.log('failed to drop db')
    }
  }
}

export default DB