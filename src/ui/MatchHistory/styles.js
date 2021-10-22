import styled from "styled-components";

export const ResultsWrapper = styled.div`
  ${({ areYouWinningSon }) => areYouWinningSon ? 'color: #559999;' : 'color: #b05e6c;'}
`

export const AgainstWrapper = styled.div`
  margin-left: 20px;
`

export const SingleMatchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 700px;
  align-items: center;
  margin-top: 10px;
  
  color: black;
  font-family: Roboto;
  
  border: 0.5px solid black;
  cursor: pointer;
`

export const SingleMatchDataWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const TdmNamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`