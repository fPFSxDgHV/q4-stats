import styled from 'styled-components'

export const JoinServerWrapper = styled.div`
  padding-left: 20px;
  padding-right: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #2D3848;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 10px;
  }
`

export const PlayWrapper = styled.div`
  margin-top: 30px;
  width: 350px;
  color: white;
  font-family: ${props => props.theme.typography.fontText};
  border-radius: 4px;
  background: ${props => props.theme.typography.modalColor};
`

export const ConnectToWrapper = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  background: ${props => props.theme.subHeader};
  border-bottom: 1.5px solid ${props => props.theme.typography.ally};
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  padding-left: 20px;  
  align-items: center;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

export const ConnectTextWrapper = styled.div`
  margin-left: 5px;
`

export const FlagWrapper = styled.div`
  display: flex;
`

export const NameWrapper = styled.div`
  margin-left: 5px;
`