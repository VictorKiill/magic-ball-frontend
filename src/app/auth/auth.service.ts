import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:4200/api/users'

  private api_key = 'dXNlcm5hbWU6cGFzc3dvcmQ='

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + this.api_key
  });

  private requestOptions = { headers: this.headers }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl, user, this.requestOptions)
  }

  authUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl+'/auth', user, this.requestOptions)
  }

}
