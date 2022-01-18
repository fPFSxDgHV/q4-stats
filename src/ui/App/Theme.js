import React from 'react'
import { ThemeProvider} from "styled-components";
import * as themes from '../themes'

const Theme = ({ children }) => (
  <ThemeProvider theme={themes.dark}>
    {children}
  </ThemeProvider>
)

export default Theme