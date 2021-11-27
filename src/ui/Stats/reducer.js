import {createSlice} from "@reduxjs/toolkit";

export const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    duels: {
      played: 0,
      wins: 0,
      loses: 0,
    },
    tdms: {
      played: 0,
      wins: 0,
      loses: 0,
    },
    maps: []
  },
  reducers: {
    loadDuelStats: (state, action) => {
      return {...state, duels: action.payload}
    },
    loadTdmStats: (state, action) => {
      return {...state, tdms: action.payload}
    },
    loadMapStats: (state, action) => {
      return {...state, maps: action.payload}
    }
  }
})

export const {loadDuelStats, loadTdmStats, loadMapStats} = statsSlice.actions

export default statsSlice.reducer