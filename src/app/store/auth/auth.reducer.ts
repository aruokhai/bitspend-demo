import { Action, createReducer, on } from "@ngrx/store";
import { googleFail, googleStart, googleSuccess, logOut, loginFail, loginStart, loginSuccess, signUpStart, signupFail, signupSuccess } from "./auth.actions";

export interface AuthState {
    authState: string | null,
    authToken: string | null
    error: string | null,
}

export const initialState: AuthState = {
    authState: null,
    authToken: null,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action) => {
        return{
            ...state,
            authState: "success",
            authToken: action.authToken,
            error: null
        }
    }),
    on(loginFail, (state, action) =>{
        return {
            ...state,
            authState: "failure",
            error: action.error,
        }
    }),
    on(loginStart, (state) =>{
        return {
            ...state,
            authState: "pending",
            error: null,
        }
    }),
    on(googleSuccess, (state, action) => {
        return{
            ...state,
            authState: "success",
            authToken: action.authToken,
            error: null
        }
    }),
    on(googleFail, (state, action) =>{
        return {
            ...state,
            authState: "failure",
            error: action.error,
        }
    }),
    on(googleStart, (state) =>{
        return {
            ...state,
            authState: "pending",
            error: null,
        }
    }),
    on(signupSuccess, (state) => {
        return{
            ...state,
            authState: "success",
            error: null
        }
    }),
    on(signupFail, (state, action) =>{
        return {
            ...state,
            authState: "failure",
            error: action.error,
        }
    }),
    on(signUpStart, (state) =>{
        return {
            ...state,
            authState: "pending",
            error: null,
        }
    }),
    on(logOut, (state) =>{
        return {
            ...state,
            authState: null,
            authToken: null,
            error: null,
        }
    })
)

export function AuthReducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action)
}