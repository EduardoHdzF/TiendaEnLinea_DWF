import { HttpClient, HttpClientModule, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../_model/user';
import { urlApiLoginUsuario } from '../_helper/urls';
import { LoginResponse } from '../_model/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string | null | undefined;
  private loggedInUsername: string | null;

  private urlLogin = urlApiLoginUsuario;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { 
    this.token = '';
    this.loggedInUsername = '';
  }

  public login(user: User): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(this.urlLogin , user, { observe: 'response' });
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    this.router.navigateByUrl('/login')
  }

  public saveToken(token: string ): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User| null {
    
    let usuarioCache = localStorage.getItem('user');
    if(usuarioCache !== null){
      return JSON.parse(usuarioCache);
    }
    return null;
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string | null | undefined{
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }
}