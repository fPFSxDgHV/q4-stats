import {configureStore} from '@reduxjs/toolkit'
import header from './Header/reducer'
import settings from './Settings/reducer'

import { duelReducer, tdmReducer} from "./MatchHistory/reducer";


export default configureStore({
  reducer: {
    header,
    settings,
    duel: duelReducer,
    tdm: tdmReducer,
  }
})