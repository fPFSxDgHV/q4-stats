import styled from 'styled-components'

import { ThemeHelper } from '../../themes'

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  &:first-child {
    margin-right: 80px;
  }
  
  background: ${ThemeHelper.getModalColor};
  border-radius: 4px;
`

export const StatsHeaderWrapper = styled.div`
  font-family: ${ThemeHelper.getFontHeader};
  color: ${ThemeHelper.getHeaderColor};
  font-weight: 700;
  font-size: 14px;
  
  margin-bottom: 20px;
  
  background: ${ThemeHelper.getSubheaderColor};
  border-bottom: 2px solid ${ThemeHelper.getAllyColor};
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
`

export const StatsTextWrapper = styled.div`
  color: ${ThemeHelper.getHeaderColor};
  font-family: ${ThemeHelper.getFontText};
`