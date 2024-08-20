import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { WalletComponent } from './wallet/wallet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FundWalletComponent } from './components/fund-wallet/fund-wallet.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { QuickActionCardComponent } from './components/quick-action/quick-action.component';
import { AccountComponent } from './settings/account/account.component';
import { SecurityComponent } from './settings/security/security.component';
import { CardBalanceComponent } from './components/card-balance/card-balance.component';
import { PaymentCardComponent } from './components/withdraw-wallet/withdraw-wallet.component';
import { DialogueBoxComponent } from './components/dialogue-box/dialogue-box.component';
import { TransactionFailedComponent } from './components/transaction-failed/transaction-failed.component';
import { DynamicTitleComponent } from './components/dynamic-title/dynamic-title.component';
import { BankListInputComponent } from './components/bank-list-input/bank-list-input.component';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { WalletEffects } from '../../store/wallet/wallet.effects';
import { walletReducer } from '../../store/wallet/wallet.reducer';
import { StoreModule } from '@ngrx/store';
import { TransactionEffects } from '../../store/transaction/transacton.effects';
import { transactionReducer } from '../../store/transaction/transaction.reducer';
import { LoaderComponent } from './components/loader/loader.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { SendPaymentComponent } from './components/send-payment/send-payment.component';
import { ViewTransactionComponent } from './components/view-transaction/view-transaction.component';
import { userReducer } from '../../store/user/user.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormatNarrationPipe } from 'src/app/pipes/format-narration.pipe';
import { RoundAmountPipe } from 'src/app/pipes/round-amount.pipe';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { FormatTransactionRefPipe } from 'src/app/pipes/format-transaction-ref-pipe';


@NgModule({
  declarations: [
    HomeComponent,
    FormatNarrationPipe,
    FormatTransactionRefPipe,
    RoundAmountPipe,
    TransactionHistoryComponent,
    WalletComponent,
    FundWalletComponent,
    MessagesComponent,
    NotificationsComponent,
    SidebarComponent,
    NavbarComponent,
    TransactionTableComponent,
    QuickActionCardComponent,
    AccountComponent,
    SecurityComponent,
    CardBalanceComponent,
    PaymentCardComponent,
    DialogueBoxComponent,
    TransactionFailedComponent,
    BankListInputComponent,
    LoaderComponent,
    SuccessPageComponent,
    SendPaymentComponent,
    ViewTransactionComponent,
    DynamicTitleComponent,
    LoadingScreenComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSnackBarModule,
    FontAwesomeModule,
    ReactiveFormsModule,  
    EffectsModule.forFeature([WalletEffects, TransactionEffects]),
    StoreModule.forFeature('wallet', walletReducer),
    StoreModule.forFeature('transactions', transactionReducer),
    StoreModule.forFeature('user', userReducer),
  ]
})
export class DashboardModule { }
