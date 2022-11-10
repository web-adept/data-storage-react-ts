import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { FormControl, InputLabel, Input } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAdded, hideModal, mockAPI_URL } from '../store/usersSlice'
import { DataStatement, UserData } from '../types'
import { AppDispatch } from '../store/store'

const initialForm: UserData = {
  nickName: '@',
  firstName: '',
  lastName: '',
  age: '',
  email: '',
}
const formStyle: {} = {
  margin: '15px',
  minWidth: ' 100px',
  width: '22rem',
}

export default function ModalWindow(): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserData>(initialForm)

  const modalStatus = useSelector(
    ({ users }: { users: DataStatement }) => users.modalStatus
  )
  const dispatch: Function = useDispatch<AppDispatch>()

  const addUser = async (user: {} | null) => {
    const res = await fetch(mockAPI_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    })
    if (!res.ok) throw new Error('Failed to add user')

    const newUser = await res.json()

    dispatch(userAdded(newUser))
  }

  const onChange = (e: {
    target: { name: string | number; value: string | number }
  }) => {
    const { name, value } = e.target

    setUserInfo((values: UserData) => ({ ...values, [name]: value }))
  }

  const onSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    setUserInfo(initialForm)
    addUser(userInfo)
    dispatch(hideModal())
  }
  const { nickName, firstName, lastName, age, email } = userInfo
  return (
    <div>
      <Modal
        keepMounted
        open={modalStatus}
        onClose={() => dispatch(hideModal())}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            margin: '30px',
            p: 4,
          }}
        >
          <form onSubmit={onSubmit}>
            <FormControl sx={formStyle}>
              <InputLabel htmlFor="my-input">Nickname</InputLabel>
              <Input
                value={nickName}
                name="nickName"
                type="text"
                onChange={onChange}
              />
            </FormControl>
            <FormControl sx={formStyle}>
              <InputLabel htmlFor="my-input">First Name</InputLabel>
              <Input
                required
                value={firstName}
                name="firstName"
                onChange={onChange}
                type="text"
              />
            </FormControl>
            <FormControl sx={formStyle}>
              <InputLabel htmlFor="my-input">Last Name</InputLabel>
              <Input
                required
                value={lastName}
                type="text"
                name="lastName"
                onChange={onChange}
              />
            </FormControl>
            <FormControl sx={formStyle}>
              <InputLabel htmlFor="my-input">Age</InputLabel>
              <Input
                required
                value={age}
                type="number"
                name="age"
                onChange={onChange}
              />
            </FormControl>
            <FormControl sx={formStyle}>
              <InputLabel htmlFor="my-input">E-mail</InputLabel>
              <Input
                required
                name="email"
                value={email}
                onChange={onChange}
                type="email"
              />
            </FormControl>
            <FormControl
              sx={{ display: 'flex', margin: '15px auto', maxWidth: '44%' }}
            >
              <Button type="submit" variant="contained">
                Fill the blank
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
