import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable();

  http = inject(HttpClient);
  
  private baseurl = environment.backendUrl;

  registerUser(user: any) {
    console.log(user);

    return this.http.post(`${this.baseurl}/users/register`, user);
  }
  loginUser(user: any) {
    return this.http.post(`${this.baseurl}/users/login`, user);
  }
 
}
