import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {
  fetchUsers,
  usersSelector,
  userDeleted,
  showModal,
  mockAPI_URL,
} from '../store/usersSlice'
import { AppDispatch } from '../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { DataStatement } from '../types'

export default function BasicTable(): JSX.Element {
  const usersList = useSelector(usersSelector)

  const spinnerStatus: boolean = useSelector(
    ({ users }: { users: DataStatement }): boolean => users.spinnerStatus
  )

  const dispatch: Function = useDispatch<AppDispatch>()

  useEffect((): void => {
    dispatch(fetchUsers())
  }, [dispatch])

  const deleteUser: Function = async (id: string | number) => {
    await fetch(`${mockAPI_URL}/${id}`, {
      method: 'DELETE',
    })

    dispatch(userDeleted(id))
  }

  return (
    <>
      {spinnerStatus ? (
        <CircularProgress size={'8rem'} sx={{ margin: '20%' }} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ width: '60vw', marginTop: 4, maxHeight: 600, minWidth: 900 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: 'grey' }}>
              <TableRow>
                <TableCell align="center">Nickname</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">E-Mail</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={(): void => dispatch(showModal())}
                    variant="contained"
                    size="small"
                    color="info"
                  >
                    Add User
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((el: any) => {
                const { id, nickName, firstName, lastName, age, email } = el
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    key={nanoid()}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {nickName}
                    </TableCell>
                    <TableCell align="center">{firstName}</TableCell>
                    <TableCell align="center">{lastName}</TableCell>
                    <TableCell align="center">{age}</TableCell>
                    <TableCell align="center">{email}</TableCell>
                    <TableCell align="center">
                      <i className="delete-icon" onClick={() => deleteUser(id)}>
                        &times;
                      </i>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
