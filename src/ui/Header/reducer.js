import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    mainWidget: 'settings',
    matchId: null
  },
  reducers: {
    changeMainWidget: (state, action) => {
      state.mainWidget = action.payload
    },
    setMatch: (state, action) => {
      return {
        mainWidget: 'match',
        matchId: action.payload
      }
    }
  }
})

export const { changeMainWidget, setMatch } = headerSlice.actions

export default headerSlice.reducer