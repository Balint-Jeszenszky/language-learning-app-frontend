import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginResponse, TokenPayload, Tokens, UserDetails } from './types';

const TOKEN_KEY = 'tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokens?: Tokens;
  private loggedIn: ReplaySubject<boolean> = new ReplaySubject();
  private readonly http: HttpClient;

  constructor(
    private readonly router: Router,
    httpBackend: HttpBackend,
  ) {
    this.loggedIn.next(false);
    this.http = new HttpClient(httpBackend);
    const tokens = localStorage.getItem(TOKEN_KEY);

    if (tokens) {
      const parsedTokens = JSON.parse(tokens) as LoginResponse;

      if (!parsedTokens) {
        return;
      }

      if (!this.isExpired(parsedTokens.accessToken)) {
        this.setTokens(parsedTokens);
      } else if (!this.isExpired(parsedTokens.refreshToken)) {
        this.refresh(parsedTokens.refreshToken);
      } else {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const response = this.http.post<LoginResponse>('/api/auth/login', { email, password });

    return new Observable<LoginResponse>(subscriber => {
      response.subscribe(res => {
        this.setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
        this.router.navigate(['/']);
        subscriber.next(res);
      });
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  register(name: string, email: string, password: string, confirmPassword: string): Observable<UserDetails> {
    return this.http.post<UserDetails>('/api/auth/register', { name, email, password, confirmPassword });
  }

  getAccessToken(): string | undefined {
    return this.tokens?.accessToken;
  }

  logout(): void {
    const refreshToken = this.tokens?.refreshToken;
    this.loggedIn.next(false);
    localStorage.removeItem(TOKEN_KEY);
    this.tokens = undefined;
    this.router.navigate(['/auth']);
    this.http.post<void>('/api/auth/logout', { refreshToken }).subscribe();
  }

  private setTokens(tokens: Tokens): void {
    this.tokens = tokens;
    this.loggedIn.next(true);
    const expiration = this.getTokenPayload(tokens.accessToken).exp * 1000;
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    this.router.navigate([this.router.url]);
    setTimeout(() => this.refresh(tokens.refreshToken), expiration - Date.now() - 10000);
  }

  private refresh(refreshToken: string): void {
    this.http.post<LoginResponse>('/api/auth/login/refresh', { refreshToken }).subscribe({
      next: res => {
        this.setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken });
      },
      error: err => {
        console.error(err);
        this.logout();
      }
    });
  }

  private getTokenPayload(token: string): TokenPayload {
    const payload = token.split('.')[1];
    const parsed = JSON.parse(window.atob(payload)) as TokenPayload;
    return parsed;
  }

  private isExpired(token: string): boolean {
    const payload = token.split('.')[1];
    const parsed = JSON.parse(window.atob(payload));
    const expiration = parsed.exp * 1000;
    return new Date(expiration) < new Date();
  }
}
