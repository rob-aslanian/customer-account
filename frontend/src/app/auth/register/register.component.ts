import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/core/models';
import { AuthService } from 'src/app/core/services/auth.service';
import { NottificationService } from 'src/app/core/services/nottification.service';
import { SetUser } from 'src/app/core/store/user/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private store: Store,
    private authService: AuthService,
    private nottifyService: NottificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(user: IUser) {
    this.authService.register(user).subscribe((el) => {
      this.store.dispatch(new SetUser(el));
      this.nottifyService
        .showNotify({
          position: 'top-end',
          icon: 'success',
          title: 'Register completed',
          showConfirmButton: false,
          timer: 1500,
        })
        .then((_) => this.router.navigate(['/users']));
    });
  }
}
