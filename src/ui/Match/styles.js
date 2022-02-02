import styled from "styled-components";
import {ThemeHelper} from "../themes";

export const NamesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 500px;
`

export const NameWrapper = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  font-family: ${ThemeHelper.getFontHeader};
  color: ${ThemeHelper.getHeaderColor};
`

export const MatchWrapper = styled.div`
  font-family: Roboto;
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  background: #3A4556;
  padding: 10px;
`


export const WeaponImg = styled.img`
  width: 24px;
  height: 24px;
`

export const DuelHeaderDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  align-items: center;
  margin-bottom: 20px;
  font-family: ${ThemeHelper.getFontText};
  color: ${ThemeHelper.getHeaderColor};
  `

export const TdWrapper = styled.td`
  text-align: center;
  font-family: ${ThemeHelper.getFontHeader};
  color: ${ThemeHelper.getHeaderColor};
  `

export const ThWrapper = styled.th`
  font-family: ${ThemeHelper.getFontHeader};
  color: ${ThemeHelper.getHeaderColor};
  font-weight: 700;
`