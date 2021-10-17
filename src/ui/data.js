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
  "oBicWdaiqo": "Sanchez",
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

export class DuelHelper {
  static getPlayerName(matchData, guid) {
    return matchData?.players?.find(q => q.guid === guid)?.name
  }

  static getEnemyPlayerName(matchData, guid) {
    return matchData?.players?.find(q => q.guid !== guid)?.name
  }
}