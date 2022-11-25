import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Answer } from 'src/app/answers/answer.model';
import { isQuestionValidator } from './is-question.validator';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  private answer:Answer = {id:null, message: ''};
  form: FormGroup
  question = '';
  answerMessage = this.answer.message

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'question': new FormControl(this.form, {
        validators: [Validators.minLength(3), Validators.required]
      })
    })
    this.form.setValue({
      question: this.question
    })
  }

  getAnswer(question: string, formDirective: FormGroupDirective) {
    if (this.form.invalid) return;
    if (question === "Quem é o seu criador?") {
      this.answerMessage = "É o Victor Cruz"
      this.question = question
      return;
    }
    const answer = this.http.get<Answer>('http://localhost:8080/answers/random').subscribe(res => {
      this.answer = res
      this.answerMessage = this.answer.message
      this.question = question
    });
    formDirective.resetForm()
    this.form.reset()
  }

}
