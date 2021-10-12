import { createSlice } from "@reduxjs/toolkit";

export const duelSlice = createSlice({
  name: 'duel',
  initialState: {
    matches: []
  },
  reducers: {
    loadDuels: (state, action) => {
      state.matches = action.payload
    },
  }
})

export const tdmSlice = createSlice({
  name: 'tdm',
  initialState: {
    matches: []
  },
  reducers: {
    loadTdm: (state, action) => {
      state.matches = action.payload
    },
  }
})

export const { loadDuels } = duelSlice.actions
export const { loadTdm } = tdmSlice.actions

export const duelReducer = duelSlice.reducer
export const tdmReducer = tdmSlice.reducer

