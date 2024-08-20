import { createAction, props } from "@ngrx/store";
import { EmailUser } from "src/app/models/user-interface";


export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const SIGNUP_FAIL = '[auth page] signup Fail';

export const GOOGLE_START = '[auth page] google start';
export const GOOGLE_SUCCESS = '[auth page] google Success';
export const GOOGLE_FAIL = '[auth page] google Fail';


export const LOGOUT_ACTION = '[auth page] logout';


export const loginSuccess = createAction(
    LOGIN_SUCCESS,
    props<{ authToken: string | null }>()
)

export const loginStart = createAction(
    LOGIN_START,
    props<{ email: string, password: string }>()
)

export const logOut = createAction(
    LOGOUT_ACTION
)

export const googleFail = createAction(
    GOOGLE_FAIL,
    props<{ error: string }>()
)

export const googleSuccess = createAction(
    GOOGLE_SUCCESS,
    props<{ authToken: string | null }>()
)

export const googleStart = createAction(
    GOOGLE_START
)

export const loginFail = createAction(
    GOOGLE_FAIL,
    props<{ error: string }>()
)

export const signupSuccess = createAction(
    SIGNUP_SUCCESS
)

export const signUpStart = createAction(
    SIGNUP_START,
    props<{ email: string, password: string , userData: EmailUser}>()
)

export const signupFail = createAction(
    SIGNUP_FAIL,
    props<{ error: string }>()
)