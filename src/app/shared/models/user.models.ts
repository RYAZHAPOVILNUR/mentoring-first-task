interface ICompany {
  name: string,
  catchPhrase: string,
  bs: string,
}

interface IGeo {
  lat: string,
  lng: string,
}

interface IAdress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: IGeo,
}

export interface IUser {
  id: number,
  name: string,
  username: string,
  email: string,
  addres: IAdress,
  phone: string,
  website: string,
  company: ICompany,
}
