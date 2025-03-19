import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUser, RegisterUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable();

  // private userSubject = new BehaviorSubject<LoginResponse['data'] | null>(null);
  // public user$: Observable<LoginResponse['data'] | null> =
  //   this.userSubject.asObservable();

  http = inject(HttpClient);

  private baseurl = environment.backendUrl;

  registerUser(user: RegisterUser) {
    console.log(user);

    return this.http.post(`${this.baseurl}/users/register`, user);
  }
  loginUser(user: LoginUser) {
    return this.http.post(`${this.baseurl}/users/login`, user);
  }
}
