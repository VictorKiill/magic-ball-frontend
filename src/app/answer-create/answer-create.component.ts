import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Answer } from '../answers/answer.model';
import { AnswersService } from '../answers/answers.service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-answer-create',
  templateUrl: './answer-create.component.html',
  styleUrls: ['./answer-create.component.css']
})
export class AnswerCreateComponent implements OnInit {

  form: FormGroup
  typesOfAnswers = [
    {value: "YESNO", valueDisplay: "Sim ou Não"},
    {value: "WHAT", valueDisplay: "O que"},
    {value: "WHERE", valueDisplay: "Onde"},
    {value: "HOW", valueDisplay: "Como"},
    {value: "WHO", valueDisplay: "Quem"},
    {value: "WHY", valueDisplay: "Por que"},
  ]

  constructor(private service: AnswersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      'answer': new FormControl(this.form, {
        validators: [Validators.minLength(3), Validators.required]
      }),
      'type': new FormControl(this.form, {
        validators: [Validators.required]
      })
    })
  }

  postAnswer(answerMessage: string, type: string,  formDirective: FormGroupDirective) {
    this.service.addAnswer({
      type: type,
      message: answerMessage
    }).subscribe(res => {
      this.dialog.open(SuccessComponent, {data: {message: "Resposta criada com sucesso!"}})
      formDirective.resetForm()
      this.form.reset()
    })
  }

}
