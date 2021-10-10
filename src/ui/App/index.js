import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  font-family: "Open_Sans";
  font-weight: 400;
  font-style: normal;
  font-size: 36px;
`

const MainWrapper = styled.div`
  font-family: "Roboto";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;

`

const Header = () => <HeaderWrapper>The spectacle before us was indeed sublime. </HeaderWrapper>

const App = () => (
  <div>
    <Header />
    <MainWrapper>Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds. </MainWrapper>
  </div>
)

function runApp() {
  render(<App />, document.getElementById('root'))
}

export default runApp