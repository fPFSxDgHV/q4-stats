import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    mainWidget: 'settings',
  },
  reducers: {
    changeMainWidget: (state, action) => {
      state.mainWidget = action.payload
    },
  }
})

export const { changeMainWidget } = headerSlice.actions

export default headerSlice.reducer