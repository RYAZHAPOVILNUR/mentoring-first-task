export interface IUser  {
    id:number,
    name:string,
    userName?:string,
    email:string,
    address?:IAddress,
    phone:string,
    website:string,
    company?:ICompany
}

interface IAddress {
    street:string,
    suite:string,
    city:string,
    zipcode:string,
    geo:IGeo
}

interface ICompany {
    name:string,
    catchPhrase:string,
    bs:string
}

interface IGeo {
    lat:string,
    lng:string
}