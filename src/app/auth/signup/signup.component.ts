import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup
  isLoading = false

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      'username': new FormControl(this.form, {
        validators: [Validators.minLength(3), Validators.maxLength(20) ,Validators.required]
      }),
      'email': new FormControl(this.form, {
        validators: [Validators.required, Validators.email]
      }),
      'password': new FormControl(this.form, {
        validators: [Validators.minLength(8), Validators.required]
      })
    })
  }

  postUser(username: string, email: string, password: string,  formDirective: FormGroupDirective) {
    this.isLoading = true
    this.service.createUser({
      username,
      email,
      password
    }).subscribe(res => {
      this.isLoading = false
      console.log(res)
      formDirective.resetForm()
      this.form.reset()
    }, err => {
      console.log(err)
      this.isLoading = false
      formDirective.resetForm()
      this.form.reset()
    })
  }

}
