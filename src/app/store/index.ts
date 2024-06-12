import { ActionReducerMap } from '@ngrx/store';
import { RouterReducer, UserState } from './user.reducer';

export interface State {
  users: UserState;
}
export const reducer: ActionReducerMap<State> = {
  users: RouterReducer,
};
