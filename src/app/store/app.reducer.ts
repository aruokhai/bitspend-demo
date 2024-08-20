import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromAuth from './auth/auth.reducer';
import * as fromWallet from './wallet/wallet.reducer'
import * as fromTransactions from './transaction/transaction.reducer'
import * as fromUser from './user/user.reducer'
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export interface HttpError {
  error: HttpErrorResponse;
  errorEffect: string;
}

export interface AppState {
    auth: fromAuth.AuthState
    wallet: fromWallet.WalletState,
    transactions: fromTransactions.TransactionState
    user: fromUser.UserState
}


export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  wallet: fromWallet.walletReducer,
  transactions: fromTransactions.transactionReducer,
  user: fromUser.userReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  hydrationMetaReducer
]