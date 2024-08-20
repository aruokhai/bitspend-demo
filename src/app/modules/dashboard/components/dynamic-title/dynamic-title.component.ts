import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-dynamic-title',
  templateUrl: './dynamic-title.component.html',
  styleUrls: ['./dynamic-title.component.css']
})
export class DynamicTitleComponent implements OnInit {

  title = '';

  constructor(
    private route: ActivatedRoute,
    private store : Store<AppState>,
    ) {}

   ngOnInit(): void {
    const currentUrl = this.route.snapshot.url;
    const path = currentUrl[0].path;
    
    switch(path){
      case "settings":
        this.title = "Settings";
        break;
      case "security":
        this.title = "Settings";
        break;
      case "profile":
        this.title = "Settings";
        break;
      case "home":
        this.title = "Dashboard"
        break;
      case "wallet":
        this.title = "Wallets";
        break;
      case "transaction-history":
        this.title = "Transactions"
        break;
    }
  }

}
