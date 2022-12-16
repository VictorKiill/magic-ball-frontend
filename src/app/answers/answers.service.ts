import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Answer } from './answer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AnswersService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:4200/api/answers'

  getAllAnswers(pageIndex, pageSize): Observable<{content: Answer[], totalElements: number}> {
    return this.http.get<{content: Answer[], totalElements: number}>(this.apiBaseUrl+ `?size=${pageSize}&page=${pageIndex}`).pipe(map(res => {
      res.content.map(answer => {
        if(answer.type == "YESNO") answer.type = "Sim ou Não"
        if(answer.type == "WHAT") answer.type = "O que"
        if(answer.type == "WHERE") answer.type = "Onde"
        if(answer.type == "HOW") answer.type = "Como"
        if(answer.type == "WHO") answer.type = "Quem"
        if(answer.type == "WHY") answer.type = "Por que"
        return answer
      })

      return res
    }))
  }

  getAnswer(question: string): Observable<Answer> {
    return this.http.get<Answer>(this.apiBaseUrl + '/random/'+question)
  }

  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.apiBaseUrl, answer)
  }
}
