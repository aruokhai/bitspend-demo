import { Action, createAction, props } from "@ngrx/store";
import { GetWalletResponse } from "../../interfaces/wallet-interface";



export const FETCH_WALLET = 'FETCH_WALLET';
export const FETCH_WALLET_SUCCESS = 'FETCH_WALLET_SUCCESS';
export const FETCH_WALLET_FAILURE = 'FETCH_WALLET_FAILURE';
export const CREATE_WALLET_FAILURE = 'CREATE_WALLET_FAILURE';
export const CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS';
export const CREATE_WALLET = 'CREATE_WALLET';
export const RESET_WALLET = 'RESET_WALLET';


export const FetchWallet = createAction(
    FETCH_WALLET, 
    props<{walletId : string }>()

    )

export const FetchWalletSuccess = createAction(
    FETCH_WALLET_SUCCESS, 
    props<{wallet : GetWalletResponse | null }>()

    )

export const FetchWalletFailure = createAction(
    FETCH_WALLET_FAILURE, 
    props<{error : string}>()

    )

export const createWallet = createAction(
    CREATE_WALLET, 
    props<{email: string, phoneNumber: string, firstName: string, lastName: string}>()

    )

export const createWalletSuccess = createAction(
    CREATE_WALLET_SUCCESS, 
    props<{wallet : GetWalletResponse }>()

    )

export const createWalletFailure = createAction(
    CREATE_WALLET_FAILURE, 
    props<{error : string}>()

    )

export const resetWallet = createAction(
    RESET_WALLET

    )
