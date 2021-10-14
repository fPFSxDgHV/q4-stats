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


class DB {
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
      tables: [settingsTable, duelTable, tdmTable]
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
      from: 'Settings'
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

  static async insertDuels(duels) {
    const r = await connection.insert({
      into: 'Duel',
      values: [...duels]
    })

    if (r > 0) {
      console.log(`inserted ${r} values`)
    }
  }

  static async insertTdms(tdms) {
    const r = await connection.insert({
      into: 'Team DM',
      values: [...tdms]
    })

    if (r > 0) {
      console.log(`inserted ${r} values`)
    }
  }

  static async getDuels() {
    return await connection.select({
      from: 'Duel'
    })
  }

  static async getTdms() {
    return await connection.select({
      from: 'Team DM'
    })
  }

  static async updateGuid(newGuid) {
    await connection.update({
      in: 'Settings',
      set: {
        guid: newGuid
      }
    })
  }
}

export default DB