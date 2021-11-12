import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {changeMainWidget} from "./reducer";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #192638;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;

  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  app-region: drag;
  -webkit-app-region: drag;
`

const HeaderOption = styled.div`
  font-family: "Open_Sans";
  font-weight: 400;
  font-style: normal;
  font-size: 24px;
  cursor: pointer;
  margin-right: 40px;

  ${({isSelected}) => isSelected && 'border-bottom: 1px solid #468ffc;'}
  
  &:first-of-type {
    margin-left: 5vw;
  }

  app-region: no-drag;
  -webkit-app-region: no-drag;
`

const Header = () => {
  const dispatch = useDispatch()
  const mainWidget = useSelector(state => state?.header?.mainWidget)

  return (
    <HeaderWrapper>
      <HeaderOption isSelected={mainWidget === 'stats'}
                    onClick={() => dispatch(changeMainWidget('stats'))}>Stats</HeaderOption>
      <HeaderOption isSelected={mainWidget === 'matchHistory'}
                    onClick={() => dispatch(changeMainWidget('matchHistory'))}>Match history</HeaderOption>
      <HeaderOption isSelected={mainWidget === 'settings'}
                    onClick={() => dispatch(changeMainWidget('settings'))}>Settings</HeaderOption>
    </HeaderWrapper>
  )
}

export default Header