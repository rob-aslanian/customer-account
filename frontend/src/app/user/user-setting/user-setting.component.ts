import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NottificationService } from 'src/app/core/services/nottification.service';
import { UserService } from 'src/app/core/services/user.service';
import {
  SetAccounts,
  SignOut,
  UpdateUser,
} from 'src/app/core/store/user/user.actions';
import { getUser } from 'src/app/core/store/user/user.reducers';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss'],
})
export class UserSettingComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(
    private store: Store,
    private userService: UserService,
    private nottifyService: NottificationService,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(getUser).pipe(map(({ user }: any) => user));
    this.getAccounts();
  }
  updateProfile(user: IUser) {
    this.userService.updateProfile(user).subscribe((el) => {
      this.store.dispatch(new UpdateUser(el));
      this.nottifyService
        .showNotify({
          position: 'top-left',
          icon: 'success',
          title: 'Profile updated',
          showConfirmButton: false,
          timer: 1500,
        })
        .then((_) => this.router.navigate(['/users']));
    });
  }

  deleteProfile() {
    this.nottifyService
      .showNotify({
        icon: 'question',
        title: 'Do you want to delete profile ?',
        showCancelButton: true,
        confirmButtonText: `Delete`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteProfile().subscribe(() => {
            this.authService.signOut();
            this.store.dispatch(new SignOut());
            this.router.navigate(['/']);
          });
        }
      });
  }

  getAccounts() {
    this.accountService
      .getAccountsByUserID(this.authService.userID)
      .subscribe((data) => this.store.dispatch(new SetAccounts(data)));
  }

  openModal = () => this.accountService.openAccountModal();
}
