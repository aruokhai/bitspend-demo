import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['../settings/settings.component.css']
})
export class SecurityComponent {
  @Input() isToggled = false;
  public sideNavStatus  = false;



  onButtonToggled(){
    this.isToggled = !this.isToggled;
  }

}
