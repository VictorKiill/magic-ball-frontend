import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  isLoading = false

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      'username': new FormControl(this.form, {
        validators: [Validators.required]
      }),
      'password': new FormControl(this.form, {
        validators: [Validators.required]
      })
    })
  }

  logUser(username: string, password:string, formDirective: FormGroupDirective) {
    this.isLoading = true
    this.service.authUser({
      username,
      email: null,
      password
    }).subscribe(res => {
      console.log(res)
      const token = res.token;
      const username = res.username
      this.isLoading = false
      if(token) {
        const expiresInDuration = +res.expiresIn
        this.service.setLoginData(token, username, true, true, expiresInDuration)
        this.router.navigate(['/'])
      }

    }, (): void => {
      this.isLoading = false
      formDirective.resetForm()
      this.form.reset()
    })
  }

}
