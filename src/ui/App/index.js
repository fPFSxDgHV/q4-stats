import React, {useEffect} from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import {Provider, useSelector, useDispatch} from 'react-redux'

import Header from '../Header'
import store from '../store'
import Stats from "../Stats";
import MatchHistory from "../MatchHistory";
import Settings from "../Settings";
import DB from "../db";
import {loadSettings} from "../Settings/reducer";
import {loadDuels, loadTdm} from "../MatchHistory/reducer";
import Match from '../Match'
import {loadDuelStats, loadTdmStats} from "../Stats/reducer";
import startWatcher from "../../node/pathWatcher";

const MainWidgetWrapper = styled.div`
  margin-top: 40px;
`

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const loadAllTables = async (dispatch) => {
  const settings = await DB.getSettings()
  const duels = await DB.getDuels()
  const tdms = await DB.getTdms()
  const duelStats = await DB.getDuelStats()
  const tdmStats = await DB.getTdmStats()

  const maps = duels.map(q => q.map)
  const s = new Set()
  for (const map of maps) {
    s.add(map)
  }

  dispatch(loadSettings(settings))
  dispatch(loadDuels(duels))
  dispatch(loadTdm(tdms))
  dispatch(loadDuelStats(duelStats?.[0]))
  dispatch(loadTdmStats(tdmStats?.[0]))
}

const _App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    loadAllTables(dispatch)
  })

  return (
    <AppWrapper>
      <Header/>
      <MainWidget/>
    </AppWrapper>
  )
}

const App = () => (
  <Provider store={store}>
    <_App />
  </Provider>
)

const MainWidget = () => {
  const mainWidget = useSelector(state => state?.settings?.mainWidget)

  const widgets = {
    'stats': <Stats/>,
    'matchHistory': <MatchHistory/>,
    'settings': <Settings/>,
    'match': <Match />
  }

  return (
    <MainWidgetWrapper>
      {widgets[mainWidget]}
    </MainWidgetWrapper>
  )
}

async function runApp() {
  render(<App/>, document.getElementById('root'))
  await startWatcher(store)
}

export default runApp