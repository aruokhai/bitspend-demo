import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { FetchUserDataSuccess } from 'src/app/store/user/user.action';
import { googleStart } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-google-signin-btn',
  templateUrl: './google-signin-btn.component.html',
  styleUrls: ['./google-signin-btn.component.css']
})
export class GoogleSigninBtnComponent {
  imgPath = "../../../../assets/search.png";

  constructor(
    private store: Store<AppState>,
  ){}

  async googleSignIn(){
    this.store.dispatch(googleStart());
  }

}
