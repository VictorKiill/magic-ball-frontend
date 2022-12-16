import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }

  userIsAuthenticaded: boolean = false
  username: string = this.authService.getUsername()

  private authListenerSubs: Subscription

  ngOnInit(): void {
    this.userIsAuthenticaded = this.authService.getIsAuth()
    this.username = this.authService.getUsername()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticaded => {
      this.userIsAuthenticaded = isAuthenticaded
      this.username = this.authService.getUsername()
    })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

}
