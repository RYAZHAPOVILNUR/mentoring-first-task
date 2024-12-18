import {User} from "./user";

export type UserForm = Pick<User, 'name' | 'email' | 'phone' | 'website'>
