import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './routes/app.routing.module';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TheBallComponent } from './the-ball/the-ball.component';
import { ViewerComponent } from './the-ball/viewer/viewer.component';
import { AnswerCreateComponent } from './answer-create/answer-create.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TheBallComponent,
    ViewerComponent,
    AnswerCreateComponent,
    AnswerListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
