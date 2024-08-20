import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AccountComponent } from './settings/account/account.component';
import { SecurityComponent } from './settings/security/security.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
      { path:'home', component: HomeComponent},
      { path: 'settings', children:[ 
        { path: '', redirectTo: '/dashboard/settings/profile', pathMatch: 'full'},
        { path:'profile', component: AccountComponent},
        { path:'security', component: SecurityComponent},
      ]},
      { path: 'wallet', component: WalletComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent },
      {path:'**', component: PageNotFoundComponent}
    ]  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
