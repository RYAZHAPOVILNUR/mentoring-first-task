export type UsersBackType = {
  id: number,
  name: string,
  email: string,
  password: string,
  username: string,
  city: string,
  role: string,
  purchaseDate: string,
  educationStatus: string,
  educationTime: number,
  totalStoryPoints: number,
  teams_id: number,
  photo?: {
    access: string,
    path: string,
    name: string,
    type: string,
    size: number,
    mime: string,
    meta?: {
      width?: number,
      height?: number
    },
    url?: string
  }
}

export interface UserBackModel {
  list: UsersBackType[],
  errormessage: string,
  editdata: UsersBackType,
}