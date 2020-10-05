import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { SetUser } from 'src/app/core/store/user/user.actions';
import { CustomValidators } from 'src/app/core/validaton';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  submited: boolean = false;
  personalNumber: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      CustomValidators.detectPersonalNumber(),
    ])
  );

  constructor(
    private authService: AuthService,
    private store: Store,
    private route: Router
  ) {}

  ngOnInit(): void {}

  signIn(e: MouseEvent) {
    e.preventDefault();

    if (this.personalNumber.valid) {
      this.authService.signIn(this.personalNumber.value).subscribe((user) => {
        this.store.dispatch(new SetUser(user));
        this.route.navigate(['users']);
      });
    }
  }
}
