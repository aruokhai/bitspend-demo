import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-failed',
  templateUrl: './transaction-failed.component.html',
  styleUrls: ['./transaction-failed.component.css']
})
export class TransactionFailedComponent {
   public reloadPage() {
    window.location.reload();
  }

}
