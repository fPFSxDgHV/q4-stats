import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    mainWidget: 'matchHistory',
    matchId: null
  },
  reducers: {

    setMatch: (state, action) => {
      return {
        mainWidget: 'match',
        matchId: action.payload
      }
    }
  }
})

export const { setMatch } = headerSlice.actions

export default headerSlice.reducer