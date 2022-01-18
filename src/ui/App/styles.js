import styled from "styled-components";


export const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: ${props => props.theme.subBackground};
  height: 100vh;
`