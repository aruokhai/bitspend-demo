import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { GetUserResponse } from "src/app/interfaces/user-response";




export interface UserState {
    user: GetUserResponse | null,
    loading: boolean,
    errors: string
}


const initialState: UserState = {
    user: null,
    loading: false,
    errors: ""
}



export const userReducer = createReducer(
    initialState,
    on(UserActions.FetchUserData, (state) => {
        return{
            ...state,
            loading: true
        }
    }),

    on(UserActions.FetchUserDataSuccess, (state, action) => {
        return{
            ...state,
            user: action.user,
            loading: false,
        }
    }),

    on(UserActions.FetchUserDataFailure, (state) => {
        return{
            ...state,
            loading: false,
            errors: ''
        }
    }),

    on(UserActions.ResetUserData, (state) => {
        return{
            ...state,
            user: null,
            loading: false,
            errors: ''
        }
    }),
)


export function UserReducer(state: UserState | undefined, action: Action) {
    return userReducer(state, action)
}
