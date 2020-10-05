import { Component, Input, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { IAccount } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NottificationService } from 'src/app/core/services/nottification.service';
import { RemoveAccount } from 'src/app/core/store/user/user.actions';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss'],
})
export class AccountTableComponent implements OnInit {
  @Input() userID: string;
  @Input() accounts: IAccount[];

  isMe: boolean;

  constructor(
    private store: Store,
    private accountService: AccountService,
    private notifyService: NottificationService,
    private authService: AuthService,
    private config: NgbDropdownConfig
  ) {
    config.placement = 'top';
  }

  ngOnInit(): void {
    this.isMe = this.userID === this.authService.userID;
  }

  updateAccount(account: IAccount) {
    this.accountService.openAccountModal(account);
  }

  deleteAccount(id: string) {
    this.notifyService
      .showNotify({
        icon: 'question',
        title: 'Do you want delete this account ?',
        showCancelButton: true,
        confirmButtonText: `Delete`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.accountService.deleteAccount(id).subscribe(() => {
            this.store.dispatch(new RemoveAccount(id));
          });
        }
      });
  }
}
