import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';



export const selectAuth = (state: AppState) => state.auth;

export const getAuthState = createSelector(selectAuth, (state) => state)
