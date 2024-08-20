import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { AppState } from '../../../../store/app.reducer';
import { getUserData } from '../../../../store/user/user.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchUserData } from 'src/app/store/user/user.action';
import { getStorage, ref, uploadBytes, getDownloadURL } from "@angular/fire/storage";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../settings/settings.component.css']
})
export class AccountComponent implements OnInit{

    firstname = '';
    lastname = '';
    email = '';
    uid = '';
    selectedPhoto = '';
    photoUrl : string | undefined;
    phonenumber: string | undefined = '';
    isChanged = false
    user$ = this.store.pipe(select(getUserData));
    userUpdateForm: FormGroup;
    @Input() isToggled = false;
    public sideNavStatus  = false;

    constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>,
    private _userService: UserService
    ){
    this.userUpdateForm = this._fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        // eslint-disable-next-line no-useless-escape
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{1,3}[-\.\s]?\(?\d{3}\)?[-\.\s]?\d{3}[-\.\s]?\d{4}$/)]],
        country: ['']
    })
  }


ngOnInit(): void {
    
  this.getUserData();
}


async getUserData(){
      
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user){
          this.uid = user.userId
          this.photoUrl = user?.imageUrl
          this.userUpdateForm.patchValue({
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          country: user.country
});
      }
    })

}

async updateUserData(){
  const firstName = this.userUpdateForm.get('firstname')?.value;
  const lastName = this.userUpdateForm.get('lastname')?.value;
  const email = this.userUpdateForm.get('email')?.value;
  const phoneNumber = this.userUpdateForm.get('phoneNumber')?.value;
  try { 
    if(this.isChanged){
      this.photoUrl = await this.profilePhotoUpload()
    }
    await this._userService.updateUser(this.uid,{firstName, lastName, email, phoneNumber, imageUrl: this.photoUrl})
    this.store.dispatch(FetchUserData({userId: this.uid}))
    console.log('updated')
  } catch (error) {
    console.error('Error Updating User data') 
  }
}

onButtonToggled(){
    this.isToggled = !this.isToggled;
}

onFileChange(event: any){
  if(!event.target.files[0] || event.target.files[0].length == 0) {
		alert('You must select an image');
		return;
	}
  this.isChanged = true;
  this.selectedPhoto = event.target.files[0];
  const selectedPhotoType = event.target.files[0].type;
		
	if (selectedPhotoType.match(/image\/*/) == null) {
		alert("Only images are supported");
		return;
	}
  this.photoUrl = URL.createObjectURL(event.target.files[0]);
}

async profilePhotoUpload(){
  const storage = getStorage();
  const file: any = this.selectedPhoto;
  const photoRef = ref(storage, `profile/${file.name}`);

  try {
    const uploadedPhotoUrl = await uploadBytes(photoRef, file)
    if(!uploadedPhotoUrl) return;
    const getPhotoUrl = await getDownloadURL(uploadedPhotoUrl.ref)
    if(!getPhotoUrl) return;
    this.photoUrl = getPhotoUrl
    return getPhotoUrl;
  } catch (error) {
    console.error('Error in uploading profile')
    return;
  }

}

}
