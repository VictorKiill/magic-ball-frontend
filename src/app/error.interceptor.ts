import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  private errorMessages = {
  "Username not found": "Nome de usuario não cadastrado",
  "Username and password not does not matches": "Senha incorreta",
  "Username already taken": "Nome de usuario já existe",
  "Email already taken": "Email já cadastrado",
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Um erro inesperado aconteceu!'
        if (error.error.message) {
          if (this.errorMessages[error.error.message]) {
            errorMessage = this.errorMessages[error.error.message]
          } else {
            errorMessage = 'Um erro inesperado aconteceu!'
          }
        }

        this.dialog.open(ErrorComponent, {data: {message: errorMessage}})
        return throwError(() => new Error(error.message))
      })
    );
  }
}
