import { Action, createReducer, on } from "@ngrx/store";
import * as TransactionActions from './transaction.action'
import { GetTransactionResponse } from "../../models/transacton.interface";




export interface TransactionState {
    transactions: GetTransactionResponse[],
    recentTransactions: GetTransactionResponse[],
    loading: boolean,
    errors: string
}


const initialState: TransactionState = {
    transactions: [],
    recentTransactions: [],
    loading: false,
    errors: ""
}



export const transactionReducer = createReducer(
    initialState,
    on(TransactionActions.FetchAllTransactions, (state) => {
        return{
            ...state,
            loading: true
        }
    }),

    on(TransactionActions.FetchAllTransactionsSuccess, (state, action) => {
        return{
            ...state,
            transactions: action.transactions,
            loading: false,
        }
    }),

    on(TransactionActions.FetchAllTransactionsFailure, (state) => {
        return{
            ...state,
            loading: false,
            errors: ''
        }
    }),

    on(TransactionActions.FetchRecentTransactions, (state) => {
        return{
            ...state,
            loading: true
        }
    }),

    on(TransactionActions.FetchRecentTransactionsSuccess, (state, action) => {
        return{
            ...state,
            recentTransactions: action.recentTransactions,
            loading: false
        }
    }),

    on(TransactionActions.FetchRecentTransactionsFailure, (state) => {
        return{
            ...state,
            loading: false,
            errors: ''
        }
    }),

    on(TransactionActions.ResetTransactions, (state) => {
        return{
            ...state,
            transactions: [],
            recentTransactions: [],
            loading: false,
            errors: ''
        }
    }),

)


export function TransactionReducer(state: TransactionState | undefined, action: Action) {
    return transactionReducer(state, action)
}
