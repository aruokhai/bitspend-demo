import { Injectable, Optional } from '@angular/core';
import { Auth, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AuthenticationError } from '../utils/errors';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { logOut } from '../store/auth/auth.actions';
import { resetWallet } from '../store/wallet/wallet.actions';
import { ResetTransactions } from '../store/transaction/transaction.action';
import { ResetUserData } from '../store/user/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private store : Store<AppState>
  ){
  }
   
  async googleAuth(): Promise<User & {accessToken: string}> {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(this.auth, provider);
    const newUser = result.user
    if (!newUser) throw new AuthenticationError("tried to sign in google user", "no user found", "try again later");
    const accessToken =  await newUser.getIdToken();  
    return {...newUser, accessToken}
  }

  async signupUser(email: string, password: string): Promise<{ userId: string, accessToken: string }> {
      const response = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = response.user;
      const accessToken = await user.getIdToken()
      if (!user) throw new AuthenticationError("sign up a user with email","no user found", "check your email or try again later");
      await sendEmailVerification(user);
      return { 
        userId: user.uid,
        accessToken
      }  
  } 
  
  async loginUser(email: string, password: string) {
    const response = await signInWithEmailAndPassword(this.auth, email, password);
    const user = response.user;
    if (!user) throw new AuthenticationError("login a user with email","no user found", "check your email or try again later");
    if (!user.emailVerified)throw new AuthenticationError("sign up a user with email","no user found", "please check your email and verify your account");
    const accessToken =  await user.getIdToken()
    return {...user, accessToken};

} 

  
  isLoggedIn(): boolean{
    const token: string | null = localStorage.getItem('tkn');
    if (!token) return false;
    const jwtToken = jwtDecode<JwtPayload>(token, { header: false } );
    const expirationTime = jwtToken.exp;
    if(!expirationTime) {
      this.logoutUser();
      return false
    };
    const currentTime = new Date().getTime()
    if ((expirationTime*1000) < currentTime){
      this.logoutUser();
      return false
    }
    return true
  }

  async logoutUser(): Promise<void>{
     await signOut(this.auth);
     localStorage.removeItem('tkn');
     this.store.dispatch(logOut());
     this.store.dispatch(ResetTransactions())
     this.store.dispatch(resetWallet())
     this.store.dispatch(ResetUserData())
     this.router.navigate(["/auth/login"])
  }

}
