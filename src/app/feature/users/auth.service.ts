import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/model/user';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  public addAuthorizationHeader(httpHeaders: HttpHeaders): HttpHeaders {
    if(this._token != null) {
      return httpHeaders.append('Authorization', 'Bearer' + this._token);
    }
    return httpHeaders;
  } 

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }

    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')
      return this._token;
    }

    return null;
  }

  login(user: User):Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'content-Type' : 'application/x-www-form-urlencoded', 'Authorization' : 'Basic ' + credentials});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);    

    return this.httpClient.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  saveUser(accessToken: string): void {
    let payload = this.getPayloadFromAccessToken(accessToken);
    
    this._user = new User();
    this._user.name = payload.name;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;

    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  getPayloadFromAccessToken(accessToken: string): any {
    let payload: string = null;
    if(accessToken != null) {
      payload = JSON.parse(atob(accessToken.split(".")[1]));
    }
    return payload;
  }

  isAuthenticated(): boolean {
    let payload = this.getPayloadFromAccessToken(this.token);
    return payload != null && payload.user_name && payload.user_name.length>0; 
  }

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }
}
