import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
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

  authentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  switchloginState(newValue: boolean) {
    this.isLoggedIn.next(newValue);
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
        }),tap((responseData) => {
          this.authentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        })
      );
   }
    logout() {
      this.user.next(null)
    }
  }
