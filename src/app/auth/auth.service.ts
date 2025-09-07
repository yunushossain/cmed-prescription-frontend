import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface LoginPayload {
  token: string;
  username?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginPayload>(`${environment.apiBase}/auth/login`, { username, password });
  }

  saveToken(token: string) { localStorage.setItem(this.tokenKey, token); }
  getToken() { return localStorage.getItem(this.tokenKey); }
  isLoggedIn() { return !!this.getToken(); }
  logout() { localStorage.removeItem(this.tokenKey); }
}
