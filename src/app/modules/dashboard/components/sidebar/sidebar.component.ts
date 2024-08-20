import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth.service';
import { sideLinksProps } from './sidebar-interface';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getUserData } from 'src/app/store/user/user.selector';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})



export class SidebarComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>()
  @Input()
  sideNavIsToggled = false;
  user$ = this.store.pipe(select(getUserData));
  firstname = ''
  lastname = ''
  profilePhoto = ''

  sideLinks: Array<sideLinksProps> = [
    {src: "../../../../assets/icons/home.svg", linkName: "Overview" , link: "/dashboard/home"},
    {src: "bx bxs-credit-card-alt", linkName: "Wallets" , link: "/dashboard/wallet"},
    {src: "bx bxs-file-blank", linkName: "Transactions" , link: "/dashboard/transaction-history"},
    {src: "bx bxs-cog", linkName: "Settings" , link: "/dashboard/settings"},
  ] 

  linkStyle  = "relative text-base px-[16px] py-[12px] text-[#98A2B3] font-medium rounded-[7px] cursor-pointer flex items-center";

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.user$.pipe(take(5)).subscribe(user=>{
        if(user){
          this.firstname = user.firstName;
          this.lastname = user.lastName;
          if(user.imageUrl){
            this.profilePhoto = user.imageUrl
          }
        }
    })
    return
  }

  cancelButtonClicked(){
    this.sideNavToggled.emit(false)
    console.log('clicked!')
  }

  logout(){
    this.authService.logoutUser()
  }

}
