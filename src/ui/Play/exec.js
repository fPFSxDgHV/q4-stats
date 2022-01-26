import spawn from 'cross-spawn'
import path from "path";

const getGamePath = statsPath => path.join(statsPath, '../', '../',)

const handleEACCES = e => {
  if (e.message.includes('EACCES')) {
    const message = 'Don\'t have permission to open Quake4.exe file.'
  }
}

export const openGameAndJoinServer = async (statsPath, ip) => {
  try {
    console.log(statsPath)
    const pathToGame = getGamePath(statsPath)
    console.log('pathTOGame', pathToGame)
    const q4exe = await spawn('Quake4.exe', ['+set', 'fs_game', 'q4max', '+connect', ip], { cwd: pathToGame})

    q4exe.on('error', e => console.log('error1', e.message))
  } catch (e) {
    console.error(e)
    console.log(e.message)
  }
}