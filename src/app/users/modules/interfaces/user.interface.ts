export interface User {
    id?: number,
    name?: string,
    username?: string,
    email?: string,
    adress?: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
    },
    geo?: {
        lat: string,
        lng: string
    },
    phone?: string,
    website?: string,
    company?: {
        catchPhrase: string,
        bs: string
    }
}