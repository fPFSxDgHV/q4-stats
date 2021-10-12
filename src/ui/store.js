import {configureStore} from '@reduxjs/toolkit'
import header from './Header/reducer'


export default configureStore({
  reducer: {
    header,
  }
})