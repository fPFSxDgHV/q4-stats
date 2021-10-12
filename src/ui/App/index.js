import React from 'react'
import {render} from 'react-dom'
import styled from 'styled-components'
import {Provider, useSelector} from 'react-redux'

import Header from '../Header'
import store from '../store'
import Stats from "../Stats";
import MatchHistory from "../MatchHistory";
import Settings from "../Settings";

const MainWidgetWrapper = styled.div`
  margin-top: 40px;
`

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const App = () => (
  <Provider store={store}>
    <AppWrapper>
      <Header/>
      <MainWidget/>
    </AppWrapper>
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