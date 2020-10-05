import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IGetUsers, IUplaodAvatar, IUser } from '../models';
import { NottificationService } from './nottification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private nottifyService: NottificationService
  ) {}

  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.set('avatar', file);
    return this.http.post('api/upload', formData);
  }

  getUsers(
    first: string = '5',
    after: string = '0',
    sort: string
  ): Observable<IGetUsers> {
    let params = new HttpParams();
    params = params.set('first', first);
    params = params.set('after', after);

    if (sort) {
      params = params.set('sort', sort);
    }

    return this.http
      .get<IGetUsers>('api/users', {
        params,
      })
      .pipe(
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

  getUserByID(id: string): Observable<IUser> {
    return this.http.get<IUser>(`api/users/${id}`).pipe(
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

  updateProfile(user: IUser): Observable<IUser> {
    const userCopy = Object.assign({}, user);
    if (user.avatar !== null) {
      delete userCopy.avatar;
    }

    return this.http.put<IUser>('api/user', userCopy).pipe(
      switchMap((el) => {
        if (user.avatar) {
          return this.uploadAvatar((<IUplaodAvatar>user.avatar).file);
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

  deleteProfile(): Observable<any> {
    return this.http.delete('api/user').pipe(
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
}
