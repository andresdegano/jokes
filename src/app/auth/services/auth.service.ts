import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  get isLoggedInSubject() {
    return this.loggedIn.asObservable();
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return of({
      expiresIn: 3600,
      idToken: `somerandomstring__:)${password}`,
      user: {
        email,
        name: email.split('@')[0],
      },
    }).pipe(
      tap((resp) => {
        this.setSession(resp);
      }),
      shareReplay()
    );
  }

  private setSession(authData: {
    expiresIn: number;
    idToken: string;
    user: any;
  }) {
    const expiresAt = moment().add(authData.expiresIn, 'second');
    localStorage.setItem('id_token', authData.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.loggedIn.next(authData.user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loggedIn.next(null);
  }

  isLoggedIn() {
    const token = localStorage.getItem('expires_at');
    const logged = token && moment().isBefore(this.getExpiration());
    this.loggedIn.next(this.getUser());
    return logged;
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration || '0');
    return moment(expiresAt);
  }
}
