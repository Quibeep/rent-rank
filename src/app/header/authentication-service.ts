import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { UserInfo } from './user-info.model';

import { User } from './user.model';


interface AuthKey {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  user = new BehaviorSubject<User>(null);
  info = new BehaviorSubject<UserInfo>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) {}



  signup(email: string, password: string) {
    return this.http
      .post<AuthKey>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFXTbnx4lfuoifH7H55WVvu6PanQfdMN4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'Wystąpił nieznany błąd';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Ten adres email jest juz w użyciu.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage =
                'Wykonano zbyt wiele prób rejestracji, spróbuj ponownie za 15 minut.';
          }
          return throwError(errorMessage);
        }),
        tap((responseData) => {
          this.authentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  checkImg(imagePath:string) {

  }

  authentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn *1000);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  switchloginState(newValue: boolean) {
    this.isLoggedIn.next(newValue);
  }

  autoLogin() {
  const userInfo:
    {
      email:string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    }
   = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return;
  }

  const existingUser = new User(userInfo.email, userInfo.id, userInfo._token, new Date(userInfo._tokenExpirationDate));

  if (existingUser.token) {
    this.user.next(existingUser);
    this.getUserInfo();
    const expirationDuration = new Date(userInfo._tokenExpirationDate).getTime() - new Date().getTime()
    console.log('token property',userInfo._tokenExpirationDate)
    this.autoLogout(expirationDuration);
  }
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthKey>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFXTbnx4lfuoifH7H55WVvu6PanQfdMN4',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'Wystąpił nieznany błąd';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'Niepoprawny adres email';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Błędne hasło';
              break;
            case 'USER_DISABLED':
              errorMessage = 'Konto zostało dezaktywowane';
          }
          return throwError(errorMessage);
        }),
        tap((responseData) => {
          this.authentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
          this.getUserInfo();
        })
      );
   }

   getUserInfo() {
    this.http.get<UserInfo>('https://rent-rank-default-rtdb.europe-west1.firebasedatabase.app/registration/'+this.user.value.id +'.json')
      .subscribe(userData => {
        this.info.next(userData);
    })


  }

    logout() {
      this.user.next(null);
      localStorage.removeItem('userInfo');
      if(this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
      console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
    }
  }
