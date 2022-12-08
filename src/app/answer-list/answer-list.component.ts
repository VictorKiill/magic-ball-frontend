import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Answer } from '../answers/answer.model';
import { AnswersService } from '../answers/answers.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {

  constructor(private service: AnswersService) { }

  answers: Answer[]

  totalAnswers = 0
  answersPerPage = 3
  answersPerPageOptions = [3, 5, 10, 50]
  isLoading = true

  ngOnInit(): void {
    this.service.getAllAnswers(0, this.answersPerPage).subscribe(res => {
      this.isLoading = false
      this.answers = res.content
      this.totalAnswers = res.totalElements
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.answersPerPage = pageData.pageSize
    this.service.getAllAnswers(pageData.pageIndex, this.answersPerPage).subscribe(res => {
      this.answers = res.content
      this.totalAnswers = res.totalElements
    })
  }

}
