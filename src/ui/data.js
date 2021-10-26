export const maps = [
  {
    name: 'l4dm2_1',
    sName: 'monsoon',
    image: 'l4dm2_1.png'
  },
  {
    name: 'wvwq4dm1',
    sName: 'placebo',
    image: 'wvwq4dm1.png'
  },
  {
    name: 'ktonq4dm2',
    sName: 'torment',
    image: 'ktonq4dm2.png'
  },
  {
    name: 'ktonq4dm4',
    sName: 'ravage',
    image: 'ktonq4dm4.png'
  },
  {
    name: 'swq4dm1',
    sName: 'phrantic',
    image: 'swq4dm1.png'
  }
]

export const guids = {
  "jQWZzSrjKls": "BetaRates",
  "XiZLHBgpR1I": "cento",
  "LE+kI0aPKus": "Dan",
  "oc0N3RJA0Bc": "HAROSH1MA",
  "Z1pyCMLNYDk": "igracsimon",
  "GlKkn0ouSPw": "imar",
  "sdPK/S/ac/c": "iudas",
  "eiJIUirXqOA": "Gosciu",
  "WZyj+XsBEGw": "gyro",
  "jGy9B7K7ko0": "Kevon",
  "Ke4jRKbYuPI": "Kloun",
  "Msm9TCgykJc": "MsJuNN",
  "g2NxJUVO/SI": "Namida",
  "eC7UtJOk0Rk": "Noustaja",
  "SGhRblwHm34": "nickaero",
  "geQNGiRD4JA": "panikborke",
  "XXIF/r7vMEk": "reez",
  "obicwdai4q0": "Sanchez",
  "LGOAiEOWiEk": "Snowy",
  "L3YqPM82Hrk": "Shug",
  "GuNHHUhxDtw": "sTPHN",
  "M3if3gPtem4": "Stryder",
  "f9uaA8nM8Xg": "Tai",
  "B71Uwlyz/NU": "Toby",
  "PZxQ7KguMII": "uN",
  "Bg1PYMTGwRU": "vally",
  "R54i5rCFiv8": "visa",
  "cfSafJhD7ml": "Wylsa",
  "RyKmV5Jf4So": "xtal",
  "Fh4xiyjJjTU": "Zilla"
}

export class MatchHelper {
  static getNameFromGuids(guid, name) {
    if (guids[guid]) {
      return guids[guid]
    } else {
      return MatchHelper.clearRBGcolors(name)
    }
  }

  static clearRBGcolors(name) {
    return name.replaceAll(/\^[Cc]*\d{1,3}/g, '')
  }

  static getPlayerName(matchData, guid) {
    const name = matchData?.players?.find(q => q.guid === guid)?.name
    return MatchHelper.clearRBGcolors(name)
  }

  static getEnemyPlayerName(matchData, guid) {
    const name = matchData?.players?.find(q => q.guid !== guid)?.name
    return MatchHelper.clearRBGcolors(name)
  }
  
  static isDuelMatch(matchData) {
    return matchData?.type === 'Duel'
  }

  static isTdmMatch(matchData) {
    return matchData?.type === 'Team DM';
  }
}

export const servers = {
  '68.232.163.17:28004': 'Central US',
  '173.199.76.108:28004': 'United Kingdom',
  '108.61.112.181:28004': 'Europe',
  '176.36.131.100:28004': 'Ukraine',
  '185.251.226.69:28004': 'United Kingdom',
  '185.96.163.168:28004': 'Northern EU',
  '66.55.137.189:28004': 'New Jersey',
  '173.199.67.226:28004': 'Moscow',
}