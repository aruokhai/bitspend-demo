import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs';
import { GetUserResponse } from 'src/app/interfaces/user-response';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/store/app.reducer';
import { FetchUserDataSuccess } from 'src/app/store/user/user.action';
import { getUserData } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.css']
})
export class DialogueBoxComponent implements OnInit {
  @Output() cancelButtonClicked = new EventEmitter<boolean>();
  dialogueForm: FormGroup;
  user$ = this.store.pipe(select(getUserData));
  user: GetUserResponse | null = null;
  uid = '';

  constructor(
    private _fb: FormBuilder,
    private store : Store<AppState>,
    private router: Router,
    private _userService: UserService
  ){
     this.dialogueForm = this._fb.group({
        // eslint-disable-next-line no-useless-escape
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{3}?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/)]]
    })
  }
  ngOnInit(): void {
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user){
        this.user = user;
        this.uid = user.userId;
      }
    })
  }


  async updateUserPhoneNumber(){
    const phoneNumber: string  = this.dialogueForm.get('phoneNumber')?.value;
    if (!this.dialogueForm.valid) {
      alert('Phone number is invalid. Try again!')
      return
      }
    await this._userService.updateUserPhoneNumber(this.uid, phoneNumber)
    const updatedUser: any = {...this.user, phoneNumber}
    this.store.dispatch(FetchUserDataSuccess({user: updatedUser}))
    this.cancelButtonClicked.emit(true)
    this.router.navigate(['/dashboard/home'])
  }

  public onCancelButtonClicked(){
    this.cancelButtonClicked.emit(true)
  }
}
