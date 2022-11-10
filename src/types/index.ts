export type UserData = {
  id?: string | number
  nickName: string
  firstName: string
  lastName: string
  age: number | string
  email: string
}

export type DataStatement = {
  entities: any
  ids: number[]
  modalStatus: boolean
  spinnerStatus: boolean
  users: [] | null
}
