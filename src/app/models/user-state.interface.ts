import { User } from "./user.interface";

export interface UserState {
    users: User[], 
    loading: boolean,
    error: any,
}