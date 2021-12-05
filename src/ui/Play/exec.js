import spawn from 'cross-spawn'
import path from "path";

const getGamePath = statsPath => path.join(statsPath, '../', '../', 'Quake4.exe')

export const openGameAndJoinServer = async (statsPath, ip) => {
  try {
    const pathToGame = getGamePath(statsPath)
    const {stdout, stderr} = await spawn(pathToGame, ['+set', 'fs_game', 'q4max', '+connect', ip])
    console.log(stdout, stderr)
  } catch (e) {
    console.error(e)
  }
}