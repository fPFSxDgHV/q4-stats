import spawn from 'cross-spawn'
import path from "path";

const getGamePath = statsPath => path.join(statsPath, '../', '../',)

export const openGameAndJoinServer = async (statsPath, ip) => {
  try {
    const pathToGame = getGamePath(statsPath)
    const {stdout, stderr} = await spawn('Quake4.exe', ['+set', 'fs_game', 'q4max', '+connect', ip], { cwd: pathToGame})
    console.log(stdout, stderr)
  } catch (e) {
    console.error(e)
  }
}