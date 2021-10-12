import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { changeMainWidget } from "./reducer";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const HeaderOption = styled.div`
  font-family: "Open_Sans";
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
`

const Header = () => {
  const dispatch = useDispatch()

  return (
    <HeaderWrapper>
      <HeaderOption onClick={() => dispatch(changeMainWidget('stats'))}>Stats</HeaderOption>
      <HeaderOption onClick={() => dispatch(changeMainWidget('matchHistory'))}>Match history</HeaderOption>
      <HeaderOption onClick={() => dispatch(changeMainWidget('settings'))}>Settings</HeaderOption>
    </HeaderWrapper>
  )
}

export default Header