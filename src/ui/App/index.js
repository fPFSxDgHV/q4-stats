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

const MainWidgetWrapper = styled.div`
  margin-top: 40px;
`

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const loadAllTables = async (dispatch) => {
  const settings = await DB.getSettings()
  const duels = await DB.getDuels()
  const tdms = await DB.getTdms()

  const maps = duels.map(q => q.map)
  const s = new Set()
  for (const map of maps) {
    s.add(map)
  }
  console.log(s)

  dispatch(loadSettings(settings))
  dispatch(loadDuels(duels))
  dispatch(loadTdm(tdms))
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
  const mainWidget = useSelector(state => state?.header?.mainWidget)

  const widgets = {
    'stats': <Stats/>,
    'matchHistory': <MatchHistory/>,
    'settings': <Settings/>
  }

  return (
    <MainWidgetWrapper>
      {widgets[mainWidget]}
    </MainWidgetWrapper>
  )
}

function runApp() {
  render(<App/>, document.getElementById('root'))
}

export default runApp