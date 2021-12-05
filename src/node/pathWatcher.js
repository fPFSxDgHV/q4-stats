import chokidar from 'chokidar'
import DB from "../ui/db"
import Parser from "./parsers/parser";
import {delay} from "../helper";
import {loadAllTables} from "../ui/App";

const _startWatcher = async (store) => {
  const statsPath = await DB.getStatsPath()

  const watcher = chokidar.watch(statsPath, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true,
  })

  watcher.on('add', async path => {
    await Parser.getAndUpdateMatchData()
    await loadAllTables(store.dispatch)
    await delay(5000)
  })
}

const startWatcher = (store) => {
  const interval = setInterval(async () => {
    const statsPath = await DB.getStatsPath()

    if (!statsPath) {
      return
    }
    await _startWatcher(store)
    clearInterval(interval)
  }, 5000)
}

export default startWatcher

