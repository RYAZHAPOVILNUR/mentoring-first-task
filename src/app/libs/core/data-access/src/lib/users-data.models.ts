import { DeepReadonly } from "../../../utils/src/lib/deep-readonly"

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

export type TUserDTO = DeepReadonly<{
  id: number,
  name: string,
  username: string,
  email: string,
  addres: IAdress,
  phone: string,
  website: string,
  company: ICompany,
}>

export type TUserEntity = DeepReadonly< Pick<TUserDTO, 'id' | 'name' | 'email' | 'phone'> >

export type TUserVM = DeepReadonly< Omit<TUserEntity, 'id'> >
