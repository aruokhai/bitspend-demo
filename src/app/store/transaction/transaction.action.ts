import { createAction, props } from "@ngrx/store";
import { GetTransactionResponse } from "../../models/transacton.interface";




export const FETCH_ALL_TRANSACTIONS = 'FETCH_ALL_TRANSACTIONS';
export const FETCH_ALL_TRANSACTIONS_SUCCESS = 'FETCH_ALL_TRANSACTIONS_SUCCESS';
export const FETCH_ALL_TRANSACTIONS_FAILURE = 'FETCH_ALL_TRANSACTIONS_FAILURE';
export const RESET_TRANSACTIONS = 'RESET_TRANSACTIONS';
export const FETCH_RECENT_TRANSACTIONS_FAILURE = 'FETCH_RECENT_TRANSACTIONS_FAILURE';
export const FETCH_RECENT_TRANSACTIONS_SUCCESS = 'FETCH_RECENT_TRANSACTIONS_SUCCESS';
export const FETCH_RECENT_TRANSACTIONS = 'FETCH_RECENT_TRANSACTIONS';



export const FetchAllTransactions = createAction(
    FETCH_ALL_TRANSACTIONS,
    props<{ walletId: string }>()
    )

export const FetchAllTransactionsSuccess = createAction(
    FETCH_ALL_TRANSACTIONS_SUCCESS, 
    props<{transactions : GetTransactionResponse[]  }>()

    )

export const FetchAllTransactionsFailure = createAction(
    FETCH_ALL_TRANSACTIONS_FAILURE, 
    props<{error : string}>()

    )

export const FetchRecentTransactionsFailure = createAction(
    FETCH_RECENT_TRANSACTIONS_FAILURE, 
    props<{error : string}>()

    )

export const FetchRecentTransactionsSuccess = createAction(
    FETCH_RECENT_TRANSACTIONS_SUCCESS, 
    props<{recentTransactions : GetTransactionResponse[]  }>()

    )

export const FetchRecentTransactions = createAction(
    FETCH_RECENT_TRANSACTIONS, 
    props<{ walletId: string }>()

    )

export const ResetTransactions = createAction(
    RESET_TRANSACTIONS
    )

