import { configureStore } from '@reduxjs/toolkit'
import users from './usersSlice'

const store = configureStore({
  reducer: { users },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export default store
