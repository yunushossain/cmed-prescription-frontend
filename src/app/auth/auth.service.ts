import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{token:string}>(`${environment.apiBase}/auth/login`, { username, password });
  }

  saveToken(t: string){ localStorage.setItem(this.tokenKey, t); }
  getToken(){ return localStorage.getItem(this.tokenKey); }
  isLoggedIn(){ return !!this.getToken(); }
  logout(){ localStorage.removeItem(this.tokenKey); }
}
