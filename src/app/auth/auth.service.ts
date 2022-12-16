import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private token: string = null;
  private authStatusListener = new Subject<boolean>()
  private isAuthenticated: boolean = false
  private tokenTimer: NodeJS.Timer
  private username: string

  private apiBaseUrl = 'http://localhost:4200/api/users'

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl+'/signup', user)
  }

  authUser(user: User): Observable<{token: string, expiresIn: string, username: string}> {
    return this.http.post<{token: string, expiresIn: string, username: string}>(this.apiBaseUrl+'/auth', user)
  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.username = ""
    this.authStatusListener.next(false)
    this.router.navigate(['/login'])
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
  }

  setLoginData(token: string, username: string, isAuth: boolean, authStatus: boolean, expiresIn: number) {
    this.token = token
    this.username = username
    this.isAuthenticated = isAuth
    this.authStatusListener.next(authStatus)
    this.setExpiresTimer(expiresIn)
    const now = new Date()
    const expirationDate = new Date(now.getTime() + expiresIn * 1000)
    console.log(expirationDate)
    this.saveAuthData(username ,token, expirationDate)
  }

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getUsername() {
    return this.username
  }

  private setExpiresTimer(duration: number) {
    console.log("Setando cronometro: " + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  private saveAuthData(username:string ,token: string, expirationDate: Date) {
    localStorage.setItem("username", username)
    localStorage.setItem("token", token)
    localStorage.setItem("expiration", expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
  }

  getAuthData() {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const username = localStorage.getItem("username")

    if (!token || !expirationDate || !username) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username
    }
  }

  autoAuthUser() {
    const authData = this.getAuthData()
    if(!authData) {
      return
    }
    const now = new Date()
    const expiresIn = authData.expirationDate.getTime() - now.getTime()
    if(expiresIn > 0) {
      this.token = authData.token
      this.username = authData.username
      this.isAuthenticated = true
      this.authStatusListener.next(true)
      this.setExpiresTimer(expiresIn / 1000)
    }

  }

}
