import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  background-color: #2AA3CC;
  font-size: 15px;
  color: #2A2A2A;
  cursor: pointer;
  padding: 5px;
  margin-top: 2px;
  margin-bottom: 2px;
  border-radius: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  outline: none;
  border: none;
  font-family: ${props => props.theme.fontText};
  
  &:hover {
    background-color: #64c0df;
    color: #2A2A2A;
  }
`

export const Button = ({ children }) => {
  return (
    <div>
      <ButtonWrapper>
        {children}
      </ButtonWrapper>
    </div>
  )
}
