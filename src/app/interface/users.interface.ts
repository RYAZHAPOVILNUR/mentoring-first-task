export interface User{
    id: number,
    name: string,
    username: string,
    email:string,
    address: UserAdress,
    phone: number,
    website: string,
    company: UserCompany,
}
export interface UserAdress{
    street: string,
    suite: string,
    city: string,
    zipcode: number,
    geo: UserGeo,
}
export interface UserCompany{
    name: string,
    catchPhrase: string,
    bs: string,
}
export interface UserGeo{
    lat: number,
    lng: number,
}