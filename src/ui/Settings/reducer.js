import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    statsPath: '',
    language: 'english',
    guid: '',
  },
  reducers: {
    loadSettings: (state, action) => {
      return action.payload
    },
  }
})

export const { loadSettings } = settingsSlice.actions

export default settingsSlice.reducer