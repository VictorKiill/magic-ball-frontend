import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  isLoading = false

  constructor(private service: AuthService) { }

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
      this.isLoading = false
      console.log(res)
      formDirective.resetForm()
      this.form.reset()
    }, (): void => {
      this.isLoading = false
      formDirective.resetForm()
      this.form.reset()
    })
  }

}
