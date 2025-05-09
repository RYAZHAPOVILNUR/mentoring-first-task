import { createSelector } from '@ngrx/store';
import { User } from '../../../Interfaces/user.interface';

interface UserState {
    users: User[];
};

interface AppState {
    users: UserState;
}

export let selectUsersFeature = (state: AppState) => state.users;

export let selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState) => state.users
)