import {configureStore} from '@reduxjs/toolkit'
import header from './Header/reducer'
import settings from './Settings/reducer'
import logger from 'redux-logger'

import { duelReducer, tdmReducer} from "./MatchHistory/reducer";
import statsSlice from "./Stats/reducer";


export default configureStore({
  reducer: {
    header,
    settings,
    duel: duelReducer,
    tdm: tdmReducer,
    stats: statsSlice
  },
  middleware: [
    logger,
  ]
})