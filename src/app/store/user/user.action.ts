import { Action, createAction, props } from "@ngrx/store";
import { GetUserResponse } from "src/app/interfaces/user-response";




export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const RESET_USER_DATA = 'RESET_USER_DATA';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';



export const FetchUserData = createAction(
    FETCH_USER_DATA, 
    props<{userId : string }>()

    )

export const FetchUserDataSuccess = createAction(
    FETCH_USER_DATA_SUCCESS, 
    props<{user : GetUserResponse | null }>()

    )

export const FetchUserDataFailure = createAction(
    FETCH_USER_DATA_FAILURE, 
    props<{error : string}>()

    )

export const ResetUserData = createAction(
    RESET_USER_DATA
    )

