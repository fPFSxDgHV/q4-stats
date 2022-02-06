import { DuelMatchStatsDB, TdmMatchStats } from '../../db'

const initMatchStats = async ({ duels, tdms }) => {
  await DuelMatchStatsDB.addNewStats(duels)
  await TdmMatchStats.addNewStats(tdms)
}

export { initMatchStats }