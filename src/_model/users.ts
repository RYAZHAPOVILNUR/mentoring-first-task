export interface User {
    id: number;
    name?: string;
    userName: string;
    email: string;
    address?: Address;
    phone: string;
    website?: string;
    company?: Company;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface AppState {
    users: User[];
    loading: boolean;
    errormessage?: string;
    // Добавьте другие состояния здесь
}
