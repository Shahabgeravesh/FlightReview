import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Authentication'

export default configureStore({
  reducer: {
    auth: authSlice
  }
})