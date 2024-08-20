import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';



export const selectUser = (state: AppState) => state.user;

export const getUserData = createSelector(selectUser, (state) => state.user)
