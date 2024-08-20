import { Action, createReducer, on } from "@ngrx/store";
import { GetWalletResponse } from "../../interfaces/wallet-interface";
import * as WalletActions from './wallet.actions'




export interface WalletState {
    wallet: GetWalletResponse | null,
    loading: boolean,
    errors: string
}


const initialState: WalletState = {
    wallet: null,
    loading: false,
    errors: ""
}



export const walletReducer = createReducer(
    initialState,
    on(WalletActions.FetchWallet, (state, action) => {
        return{
            ...state,
            loading: true
        }
    }),

    on(WalletActions.FetchWalletSuccess, (state, action) => {
        return{
            ...state,
            wallet: action.wallet,
            loading: false,
        }
    }),

    on(WalletActions.FetchWalletFailure, (state, action) => {
        return{
            ...state,
            loading: false,
            errors: ''
        }
    }),

    on(WalletActions.createWallet, (state, action) => {
        return{
            ...state,
            loading: true,
        }
    }),

    on(WalletActions.createWalletSuccess, (state, action) => {
        return{
            ...state,
            wallet: action.wallet,
            loading: false,
        }
    }),

    on(WalletActions.createWalletFailure, (state) => {
        return{
            ...state,
            loading: false,
            errors: ''
        }
    }),
    on(WalletActions.resetWallet, (state) => {
        return{
            ...state,
            wallet: null,
            loading: false,
            errors: ''
        }
    })

)


export function WalletReducer(state: WalletState | undefined, action: Action) {
    return walletReducer(state, action)
}
