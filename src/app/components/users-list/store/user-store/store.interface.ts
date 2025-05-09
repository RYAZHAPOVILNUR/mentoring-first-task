import { User } from "../../../../Interfaces/user.interface";

interface UserState {
    users: User[];
};


interface AppState {
    users: UserState;
}