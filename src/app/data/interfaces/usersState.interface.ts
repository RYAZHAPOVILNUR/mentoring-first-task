import { User } from './users.interface'

export interface IUsersState {
  users: User[]
  loading: boolean
  error: string | null
}
