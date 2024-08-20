import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';



export const selectTransactions = (state: AppState) => state.transactions;

export const getTransactionsData = createSelector(selectTransactions, (state) => state.transactions)
export const getRecentTransactions = createSelector(selectTransactions, (state) => state.recentTransactions)
