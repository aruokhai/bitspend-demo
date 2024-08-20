import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from '../../../../store/app.reducer';
import { getUserData } from 'src/app/store/user/user.selector';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  
  title = '';
  firstname = '';
  lastname = '';
  user$ = this.store.pipe(select(getUserData));

  constructor(
    private store : Store<AppState>,
    ) {}


  ngOnInit(): void {

    this.getUserName();
  
  }

  menuToggle(){
    // this.isToggled = !this.isToggled;
    // this.sideNavToggled.emit(this.isToggled)
    console.log("toggled!!")
  }

  menuButtonClicked(){
    this.sideNavToggled.emit(true)
  }

  async getUserName(){
    this.user$.pipe(take(5)).subscribe(user=>{
      if(user){
        this.firstname = user.firstName.charAt(0);
        this.lastname = user.lastName.charAt(0);
      }
    })
  }

}
