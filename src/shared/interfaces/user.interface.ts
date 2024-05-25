export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: number,
  company: {
    name: string,
  }
  address?: object
}

