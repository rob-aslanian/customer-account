import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUplaodAvatar, IUser } from '../models';
import { NottificationService } from './nottification.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private nottifyService: NottificationService,
    private userService: UserService
  ) {}

  get userID(): string {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))._id;
    }
  }
  get user(): IUser {
    if (this.isAuth) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      }
      const { user } = this.jwt.decodeToken(this.getToken);
      return user;
    }
  }
  get isAuth(): boolean {
    return !!this.getToken;
  }

  signOut(): void {
    localStorage.clear();
  }

  signIn(personal_number: string): Observable<IUser> {
    return this.http
      .post<{ token: string }>('api/auth/sign_in', { personal_number })
      .pipe(
        map(({ token }) => {
          this.setToken(token);
          const { user } = this.jwt.decodeToken(token);
          return user as IUser;
        }),
        catchError(({ error }) =>
          throwError(
            this.nottifyService.showNotify({
              icon: 'error',
              title: 'Oops...',
              text: error?.message,
            })
          )
        )
      );
  }

  register(user: IUser): Observable<any> {
    const userCopy = Object.assign({}, user);
    delete userCopy.avatar;

    return this.http.post('api/auth/register', userCopy).pipe(
      map((el: any) => {
        if (el.token) {
          this.setToken(el.token);
        }
        return el;
      }),
      switchMap((el: any) => {
        if (user.avatar) {
          return this.userService.uploadAvatar(
            (<IUplaodAvatar>user.avatar).file
          );
        }
        return of(el);
      }),
      catchError(({ error }) =>
        throwError(
          this.nottifyService.showNotify({
            icon: 'error',
            title: 'Oops...',
            text: error?.message,
          })
        )
      )
    );
  }

  private setToken(token: string) {
    if (token !== '') {
      localStorage.setItem('access_token', token);
    }
  }

  private get getToken(): string {
    return localStorage.getItem('access_token');
  }
}
