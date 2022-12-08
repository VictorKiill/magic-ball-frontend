import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Answer } from 'src/app/answers/answer.model';
import { isQuestionValidator } from './is-question.validator';
import { AnswersService } from 'src/app/answers/answers.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  private answer:Answer = {id:"", type: '', message: ''};
  form: FormGroup
  question = '';
  answerMessage = this.answer.message
  isAnswer = false
  isLoading = false

  constructor(private service: AnswersService) { }

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
    this.isLoading = true
    this.isAnswer = true
    if (question === "Quem é o seu criador?") {
      this.isLoading = false
      this.answerMessage = "É o Victor Cruz"
      this.question = question
      return;
    }
    this.question = question
    this.service.getAnswer(question).subscribe(res => {
      this.isLoading = false
      this.answer = res
      this.answerMessage = res.message
      formDirective.resetForm()
      this.form.reset()
    })
  }

  newQuestion() {
    this.isAnswer = false
  }

}
