import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { WalletState } from './wallet.reducer'
import { AppState } from '../app.reducer';



export const selectWallet = (state: AppState) => state.wallet;

export const getWalletData = createSelector(selectWallet, (state) => state.wallet)
