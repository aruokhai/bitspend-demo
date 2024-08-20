import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent {

  @Input() amount: number | undefined;
   public reloadPage() {
    window.location.reload();
  }

}
