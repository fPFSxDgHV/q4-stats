import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    loadDuelStats: (state, action) => {
      return {...state, duels: action.payload}
    },
    loadTdmStats: (state, action) => {
      return { ...state, tdms: action.payload}
    }
  }
})

export const { loadDuelStats, loadTdmStats } = statsSlice.actions

export default statsSlice.reducer