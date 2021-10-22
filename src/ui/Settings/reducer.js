import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    statsPath: '',
    language: 'english',
    guid: '',
    matchHistoryFilter: 'all'
  },
  reducers: {
    loadSettings: (state, action) => {
      return {...state, ...action.payload}
    },
    changeMatchHistoryFilter: (state, action) => {
      console.log('changeMatchHistoryFilter', action)
      return {...state, matchHistoryFilter: action.payload}
    }
  }
})

export const { loadSettings, changeMatchHistoryFilter } = settingsSlice.actions

export default settingsSlice.reducer