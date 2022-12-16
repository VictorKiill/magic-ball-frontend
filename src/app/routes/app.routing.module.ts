import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../auth/auth.guard";
import { AnswerCreateComponent } from "./../answer-create/answer-create.component";
import { AnswerListComponent } from "./../answer-list/answer-list.component";
import { LoginComponent } from "./../auth/login/login.component";
import { SignupComponent } from "./../auth/signup/signup.component";
import { TheBallComponent } from "./../the-ball/the-ball.component";

const routes: Routes = [
  { path: '', component: TheBallComponent },
  { path: 'create', component: AnswerCreateComponent, canActivate: [AuthGuard] },
  { path: 'list', component: AnswerListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
