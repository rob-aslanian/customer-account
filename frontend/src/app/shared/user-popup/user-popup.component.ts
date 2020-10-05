import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SetUser, SignOut } from 'src/app/core/store/user/user.actions';
import { getUser } from 'src/app/core/store/user/user.reducers';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss'],
})
export class UserPopupComponent implements OnInit {
  user: IUser;

  constructor(
    private store: Store,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router
  ) {
    this.store.dispatch(new SetUser(authService.user));
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.store.select(getUser).subscribe(({ user }: any) => (this.user = user));
  }

  signOut(e: MouseEvent) {
    e.preventDefault();

    this.authService.signOut();
    this.store.dispatch(new SignOut());
    this.router.navigate(['/']);
  }

  openModal = () => this.accountService.openAccountModal();
}
