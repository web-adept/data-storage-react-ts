import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { DataStatement } from '../types'

export const mockAPI_URL: string =
  'https://636cc386ab4814f2b26d7769.mockapi.io/api/v1/users'

// export const jsonServerApi: string = 'http://localhost:3000/users'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  users: [],
  spinnerStatus: false,
  modalStatus: false,
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch(mockAPI_URL)
  const data = await res.json()

  return data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalStatus = true
    },
    hideModal: (state) => {
      state.modalStatus = false
    },
    userAdded: (state, action) => {
      usersAdapter.addOne(state, action.payload)
    },

    userDeleted: (state, action) => {
      usersAdapter.removeOne(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.spinnerStatus = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload)
        state.spinnerStatus = false
      })
      .addCase(fetchUsers.rejected, () => alert('Failed to load data!'))
      .addDefaultCase(() => {})
  },
})

const { actions, reducer } = usersSlice
export const { userAdded, userDeleted, showModal, hideModal } = actions

export const { selectAll } = usersAdapter.getSelectors(
  (state: DataStatement) => state
)
export const usersSelector = createSelector(
  (state: { users: DataStatement }) => state.users,
  selectAll
)

export default reducer
