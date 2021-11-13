import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    statsPath: '',
    language: 'english',
    guid: '',
    matchHistoryFilter: 'all',
    mainWidget: 'settings'
  },
  reducers: {
    loadSettings: (state, action) => {
      return {...state, ...action.payload}
    },
    changeMatchHistoryFilter: (state, action) => {
      return {...state, matchHistoryFilter: action.payload}
    },
    changeMainWidget: (state, action) => {
      state.mainWidget = action.payload
    },
  }
})

export const { loadSettings, changeMatchHistoryFilter, changeMainWidget } = settingsSlice.actions

export default settingsSlice.reducer